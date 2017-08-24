import UserModel from './user.model';
import { client } from '../../../cassandra-db';
import DbModel from '../../db.model';
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
	return DbModel.query(allUsers)
		.then((result) => {
			users = result.rows
			res.json(users);
		}, 
		(err) => {
			handleError(res, err)
		});
}

export function show(req, res, next) {
	const userEmail = req.params.email;

	return DbModel.query(userEmail)
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

export function changePassword(req, res) {
	const userEmail = req.user.email;
	const oldPass = String(req.body.oldPassword);
	const newPass = String(req.body.newPassword);
	const newHashedPW = UserModel.encryptPassword(newPass, 16); 

	return DbModel.query(findByEmail, [userEmail])
		.then((result) => {
			if (result.authenticate(oldPass)) {
				return DbModel.query(updatePw, [newHashedPW.PW, newHashedPW.salt, userEmail])
					.then((result) => {
						res.status(204).end();
					}, 
					(err) => validationError(res, err));
			} else {
			res.status(403).end();
			}
		});
}

export function create(req, res, next) {
	const user = req.body;

	const newHashedPW = UserModel.encryptPassword(user.password, 16); 

	const id = Uuid.random();
	console.log('tits',id);
	return DbModel.query(insertUser, [id, user.email, Date.now(), newHashedPW, this.salt, user.role, user.userName], { prepare: true }).then(result => {
		
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

	}, err => validationError(res, err));
}

export function me(req, res, next) {
	const token = req.headers.token;
	const userEmail = req.user.email;

	return DbModel.query(findByEmail, [userEmail], { prepared: true }).then(result => {
		const user = result.rows[0];
	 	if (!user) return res.status(401).json({ message: 'User does not exist' });

		if (token) res.json({ token, user });
		else res.json(user);
	 }, err => next(err));
}

export function destroy(req, res) {
	const userEmail = req.user.email;

	return DbModel.query(destroyRow, [userEmail], { prepared: true }).then(result => {
		console.log('User removed successfully')
	}, (err) => {
		console.error('User not destroyed : ' + err);
	});
}