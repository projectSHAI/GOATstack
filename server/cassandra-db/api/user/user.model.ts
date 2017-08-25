import * as crypto from 'crypto';
import { client } from '../../../cassandra-db';
import DbModel from '../../db.model';
import { allUsers, findByEmail, insertUser, destroyRow } from './prepared.statements';
const Uuid = require('cassandra-driver').types.Uuid;

class UserModel {

	private salt: string;
	private password: string;
	private prepared: object = { prepared: true };
	private updatePw: string = 'UPDATE users SET password = ? WHERE email=?';
	private credentials: string = 'SELECT email, password, salt FROM users WHERE email = ?'

	/*
	Auth
	*/

	encryptPassword(password: string, byteSize: number, salt: string = this.salt): any {

		const defaultIterations = 10000;
		const defaultKeyLength = 64;

		if(this.salt !== salt) {
			this.salt = salt;
		}

		return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, 'sha512')
				.toString('base64');

	};

	randNum(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}

	authenticate(password: string, salt: string) {
		return this.password === this.encryptPassword(password, 16, salt).PW;
	};

	/*
	Queries
	*/
	allUsers(cb?: (err, result) => any) {
		return client.execute(allUsers, undefined, this.prepared, cb);
	}

	userByEmail(email: string, cb?: (err, result) => any): Promise<any> {
		return client.execute(findByEmail, [email], this.prepared, cb);
	}

	getCredentials(email: string, password: string, cb?: (err, result) => any) {
		return client.execute(this.credentials, [email], this.prepared, cb);
	}

	updatePassword(email: string, oldPW: string, newPass: string, res, cb?: (err, result) => any) {
		
		const byteSize: number = 16;

		const newSalt = crypto.randomBytes(byteSize).toString('base64')
		const newHashedPW = this.encryptPassword(newPass, 16, newSalt);

		this.getCredentials(email, oldPW, (err, result) => {
			const dbPW: string = result.rows[0].password;
			const dbSalt: string = result.rows[0].salt;
			if (this.authenticate(dbPW, dbSalt)) {
				return client.execute(this.updatePw, [newHashedPW, newSalt, email], this.prepared, cb);
			}
			else {
				res.status(403).end();
			}
		});

	}

	insertUser(email: string, username: string, password: string, cb?: (err, result) => any) {

		const byteSize: number = 16;

		const id = Uuid.random();
		console.log('tits',id);
		const salt = crypto.randomBytes(byteSize).toString('base64');
		const newHashedPW = this.encryptPassword(password, 16, salt);

		return client.execute(insertUser, [id, email, Date.now(), newHashedPW, salt, 'user', username], this.prepared, cb);
	}

}

export default new UserModel;