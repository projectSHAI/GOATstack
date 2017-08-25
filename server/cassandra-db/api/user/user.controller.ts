import UserModel from './user.model';
import { allUsers, findByEmail, updatePw, insertUser, destroyRow } from './prepared.statements';
import config from '../../../../config';
const Uuid = require('cassandra-driver').types.Uuid;

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
	return UserModel.allUsers((err, result) => {
		if(err) {
			handleError(res, err)
		}
		users = result.rows
		res.json(users);
	});
}

export function show(req, res, next) {
	const userEmail = req.params.email;

	return UserModel.userByEmail(userEmail, (err, result) => {
		if(err) {
			next(err);
		}
		if (!result) {
			return res.status(404).end();
		}
		res.json({
			username: result.rows[0].username,
			firstname: result.rows[0].firstname,
			lastname: result.rows[0].lastname
		});
	});
}

export function changePassword(req, res) {
	const userEmail = req.user.email;
	const oldPass = String(req.body.oldPassword);
	const newPass = String(req.body.newPassword);
	const newHashedPW = UserModel.encryptPassword(newPass, 16); 

	return UserModel.updatePassword(userEmail, oldPass, newPass, res, (err, result) => {
		if(err) {
			validationError(res, err);
		}
		res.status(204).end();
	});
}

export function create(req, res, next) {
	const user = req.body;

	const id = Uuid.random();
	return UserModel.insertUser(user.email, user.username, user.password, (err, result) => {
		if(err) {
			validationError(res, err)
		}
		const token = jwt.sign(
			{ 
				id: user.id,
				email: user.email,
				role: user.role
			}, 
		  	config.sessionSecret,
		  	{ expiresIn: 60 * 60 * 5 });

		req.headers.token = token;
		req.user = result.rows[0];
		next();
	});
}

export function me(req, res, next) {
	const token = req.headers.token;
	const userEmail = req.user.email;

	return UserModel.userByEmail(userEmail, (err, result) => {
		if(err) {
			next(err);
		}
		const user = result.rows[0];
		if (!user) return res.status(401).json({ message: 'User does not exist' });
		if(user.length > 1) return res.status(403).json({ message: 'Multiple users found' });
	   if (token) res.json({ token, user });
	   else res.json(user);
	});

}