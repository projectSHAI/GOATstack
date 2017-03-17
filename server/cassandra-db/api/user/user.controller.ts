import User from './user.model';
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
	return User.find().seam().subscribe(
		x => users = x, 
		err => handleError(res, err),
		() => {
			res.json(users);
		});
}

export function show(req, res, next) {
	const userId = req.params.id;

	return User.findById(userId).seam().subscribe(
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
	const userId = req.user.id;
	const oldPass = String(req.body.oldPassword);
	const newPass = String(req.body.newPassword);

	return User.findById(userId).seam().subscribe(user => {
		if (user.authenticate(oldPass)) {
			user.password = newPass;
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

	return User.create({
		email: user.email,
		password: user.password,
		username: user.username
	}).seam().subscribe(user => {
		
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
	const userEmail = req.user.email;

	return User.find({ email: userEmail }, { 
		attributes: { exclude: ['password', 'salt', 'facebook', 'google', 'github'] }
	}).seam().subscribe(user => {
	 	if (!user) return res.status(401).json({ message: 'User does not exist' });

		if (token) res.json({ token, user });
		else res.json(user);
	 }, err => next(err));
}

export function destroy(req, res) {
	const userId = req.params.id;

	return User.find({ id: userId }).seam().subscribe(user => {
		user.remove().subscribe(
			x => res.json(user), 
			err => handleError(res, err));
	});
}