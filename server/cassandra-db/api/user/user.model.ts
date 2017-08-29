import * as crypto from 'crypto';
import { client } from '../../../cassandra-db';
import DbModel from '../../db.model';
import { allUsers, findByEmail, insertUser } from './prepared.statements';
const Uuid = require('cassandra-driver').types.Uuid;
class UserModel {

	private password: string;
	private queryOptions: object = { prepared: true };
	private updatePw: string = 'UPDATE users SET password = ? WHERE email=?';
	private credentials: string = 'SELECT email, password, salt FROM users WHERE email = ?'

	/*
	Auth
	*/

	encryptPassword(password: string, byteSize: number, salt: Buffer): any {

		const defaultIterations = 10000;
		const defaultKeyLength = 64;

		return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, 'sha512')
				.toString('base64');

	};

	randNum(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}

	authenticate(password: string, salt: Buffer) {
		console.log('sluts', this.encryptPassword(password, 16, salt));
		return this.password === this.encryptPassword(password, 16, salt);
	};

	/*
	Queries
	*/
	allUsers(): Promise<any> {
		return client.execute(allUsers, undefined, this.queryOptions);
	}

	userByEmail(email: string): Promise<any> {
		return client.execute(findByEmail, [email], this.queryOptions);
	}

	getCredentials(email: string, password: string): Promise<any> {
		return client.execute(this.credentials, [email], this.queryOptions);
	}

	updatePassword(email: string, oldPW: string, newPass: string, res): Promise<any> {
		
		const byteSize: number = 16;

		const newSalt: Buffer = crypto.randomBytes(byteSize);
		const newHashedPW = this.encryptPassword(newPass, 16, newSalt);

		return this.getCredentials(email, oldPW).then( result => {
			const dbPW: string = result.rows[0].password;
			const dbSalt: Buffer = result.rows[0].salt;
			if (this.authenticate(dbPW, dbSalt)) {
				return client.execute(this.updatePw, [newHashedPW, dbSalt, email], this.queryOptions);
			}
			else {
				res.status(403).end();
			}
		}).catch(err => console.error(err));

	}

	insertUser(email: string, username: string, password: string): Promise<any> {

		const byteSize: number = 16;
		const id: string = String(Uuid.random());
		const salt: Buffer = crypto.randomBytes(byteSize);
		const saltString: string = String(salt);
		const newHashedPW = this.encryptPassword(password, 16, salt);
		const queryOptions = {
			prepared: true
		};

		return client.execute(insertUser, [id, email, Date.now(), newHashedPW, saltString, 'user', username], queryOptions);
	}

}

export default new UserModel;