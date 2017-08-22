import UserModel from './user.model';
import { client } from '../../../cassandra-db';
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
	return UserModel.allUsers().subscribe(
		x => users = x, 
		err => handleError(res, err),
		() => {
			res.json(users);
		});
}

export function show(req, res, next) {
	const userEmail = req.params.email;

	return UserModel.userByEmail(userEmail).subscribe(
		user => {
			if (!user) {
				return res.status(404).end();
			}
			res.json({
				username: user.username,
				firstname: user.firstname,
				lastname: user.lastname
			});
		}, err => next(err));
}

export function changePassword(req, res) {
	const userEmail = req.user.email;
	const oldPass = String(req.body.oldPassword);
	const newPass = String(req.body.newPassword);

	return UserModel.userByEmail(userEmail).subscribe(user => {
		if (user.authenticate(oldPass)) {
			user.password = newPass;
			//need to change .save
			return user.save().subscribe(
				x => {}, 
				err => validationError(res, err),
				() => {
					res.status(204).end();
				});
		} else {
			res.status(403).end();
		}
	});
}

export function create(req, res, next) {
	const user = req.body;

	console.log(user);

	return UserModel.createUser(user.email, user.password, user.username, 'user').subscribe(user => {
		
		const token = jwt.sign(
			{ 
				id: user.id, 
				email: user.email,
				role: user.role
			}, 
		  	config.sessionSecret,
		  	{ expiresIn: 60 * 60 * 5 });

		req.headers.token = token;
		req.user = user;
		next();

	}, err => validationError(res, err));
}

export function me(req, res, next) {
	const token = req.headers.token;
	console.log('WATTETRRRRRDOSE',req.user);
	const userEmail = req.user.email;

	return UserModel.userByEmail(userEmail).subscribe(user => {
	 	if (!user) return res.status(401).json({ message: 'User does not exist' });

		if (token) res.json({ token, user });
		else res.json(user);
	 }, err => next(err));
}

export function destroy(req, res) {
	const userId = req.params.id;

	return UserModel.destroy(userId).subscribe(user => {}, err => console.error('User not destroyed : ' + err), () => console.log('User removed successfully'));
}