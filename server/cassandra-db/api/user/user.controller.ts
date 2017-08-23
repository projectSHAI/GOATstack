import UserModel from './user.model';
import { client } from '../../../cassandra-db';
import { query } from '../../query';
import { allUsers, findByEmail, updatePw, insertUser, destroyRow } from './prepared.statements';
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
	return UserModel.allUsers().then((result) => {
		users = result.rows
		res.json(users);
	}, 
	(err) => {
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
		}, err => next(err));
}

export function changePassword(req, res, next) {
	const userEmail = String(req.user.email);
	const oldPass = String(req.body.oldPassword);
	const newPass = String(req.body.newPassword);

	return UserModel.userByEmail(userEmail)
		.then(result => {
			const dbPW: string = result.rows[0].password;
			const dbSalt: string = result.rows[0].salt;

			UserModel.updatePassword(userEmail, oldPass, newPass, dbPW, dbSalt)
				.then(result => res.status(403).end(), err => next(err));
		});
}

export function create(req, res, next) {
	const user = req.body;
	const email: string = user.email;
	const username: string = user.username;
	const pw: string = user.password;

	return UserModel.insertUser(email, username, pw)
		.then(result => {
			const token = jwt.sign(
				{ 
					id: result.rows[0].id, 
					email: result.rows[0].email,
					role: result.rows[0].role
				}, 
				  config.sessionSecret,
				  { expiresIn: 60 * 60 * 5 });
	
			req.headers.token = token;
			req.user = result.rows[0];
			next();
		}, err => validationError(res, err));
}

export function me(req, res, next) {
	const token = req.headers.token;
	const userEmail = req.user.email;

	return query(findByEmail, [userEmail], { prepared: true }).then(result => {
		const user = result.rows[0];
	 	if (!user) return res.status(401).json({ message: 'User does not exist' });

		if (token) res.json({ token, user });
		else res.json(user);
	 }, err => next(err));
}

export function destroy(req, res) {
	const userEmail = req.user.email;

	return query(destroyRow, [userEmail], { prepared: true }).then(result => {
		console.log('User removed successfully')
	}, (err) => {
		console.error('User not destroyed : ' + err);
	});
}