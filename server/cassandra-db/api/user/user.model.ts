import * as crypto from 'crypto';
import { client } from '../../../cassandra-db';
import { query } from '../../query';
import { allUsers, findByEmail, updatePw, insertUser, destroyRow } from './prepared.statements';
const Uuid = require('cassandra-driver').types.Uuid;

class UserModel {

	private salt: string;
	private password: string;

	/*
	Auth
	*/

	encryptPassword(password: string, byteSize: number, salt?: string): any {

		const defaultIterations = 10000;
		const defaultKeyLength = 64;

		if (!salt) {
			salt = this.salt;
		}
		else {
			this.salt = salt;
		}

		return crypto.pbkdf2Sync(password, this.salt, defaultIterations, defaultKeyLength, 'sha512')
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
	allUsers(): Promise<any> {
		return query(allUsers);
	}

	userByEmail(email: string): Promise<any> {
		return query(findByEmail, [email], { prepared: true });
	}

	updatePassword(userEmail: string, oldPW: string, newPass: string, dbPW: string, dbSalt: string): Promise<any> {
		
		const byteSize: number = 16;

		const newSalt = crypto.randomBytes(byteSize).toString('base64')
		const newHashedPW = this.encryptPassword(newPass, 16, newSalt);

		if (this.authenticate(dbPW, dbSalt)) {
			return query(updatePw, [newHashedPW, newSalt, userEmail]);
		}
	}

	insertUser(email: string, username: string, password: string): Promise<any> {

		const byteSize: number = 16;

		const id: string = new Uuid;
		const salt = crypto.randomBytes(byteSize).toString('base64');
		const newHashedPW = this.encryptPassword(password, 16, salt);

		return query(insertUser, [id, email, Date.now(), newHashedPW, salt, 'user', username], { prepared: true });
	}

}

export default new UserModel;