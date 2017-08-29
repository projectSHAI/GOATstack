import UserModel from './user.model';
import { client } from '../../../cassandra-db';
import { allUsers, findByEmail, insertUser } from './prepared.statements';
import config from '../../../../config';

import * as jwt from 'jsonwebtoken';

// Handles status codes and error message json
// specificity: error
function handleError(res, err) {
	if (err) {
		res.status(500).json(err);
	}
}

function validationError(res, err) {
  if (err) {
    res.status(422).json(err);
  }
}

export function index(req, res) {
	let users = [];
	return UserModel.allUsers()
		.then(result => {
			users = result.rows
			res.json(users);
		}) 
		.catch(err => {
			handleError(res, err)
		});
}

export function show(req, res, next) {
	const userEmail = req.params.email;

	return UserModel.userByEmail(userEmail)
		.then(result => {
			if (!result) {
				return res.status(404).end();
			}
			res.json({
				username: result.rows[0].username,
				firstname: result.rows[0].firstname,
				lastname: result.rows[0].lastname
			});
		})
		.catch(err => {
			handleError(res, err)
		});;
}

export function changePassword(req, res) {
	const userEmail = req.user.email;
	const oldPass = String(req.body.oldPassword);
	const newPass = String(req.body.newPassword);

	return UserModel.updatePassword(userEmail, oldPass, newPass, res)
		.then((result) => {
			res.status(204).end();
		})
		.catch(err => {
			validationError(res, err);
		});
}

export function create(req, res, next) {
	const user = req.body;
	return UserModel.insertUser(user.email, user.username, user.password)
		.then(result => {
			console.log('wer', result);
			const token = jwt.sign(
				{ 
					email: user.email,
					role: user.role
				}, 
				config.sessionSecret,
				{ expiresIn: 60 * 60 * 5 });

			req.headers.token = token;
			req.user = result.rows[0];
			next();

		})
		.catch(err => {
			console.log('waer', err);
			validationError(res, err)});
}

export function me(req, res, next) {
	const token = req.headers.token;
	const userEmail = req.user.email;

	return UserModel.userByEmail(userEmail)
		.then(result => {
			console.log('me', result.rows[0]);
			const user = result.rows[0];
			if (!user) return res.status(401).json({ message: 'User does not exist' });

			if (token) res.json({ token, user });
			else res.json(user);
		})
		.catch(err => next(err));
}