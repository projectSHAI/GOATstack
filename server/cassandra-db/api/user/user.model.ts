import * as crypto from 'crypto';
import { client } from '../../../cassandra-db';
import { allUsers, findByEmail, insertUser } from './prepared.statements';
const Uuid = require('cassandra-driver').types.Uuid;
class UserModel {

	private password: string;
	private queryOptions: object = { prepared: true };
	private updatePw: string = 'UPDATE users SET password = ?, salt = ? WHERE email = ?';
	private credentials: string = 'SELECT email, firstname, lastname, middlename, role, username, password, salt FROM users WHERE email = ?'

	/*
	Auth
	*/

	makeSalt(byteSize?: number): any {
		let defaultByteSize = 16;
		if (!byteSize) {
			byteSize = defaultByteSize;
		}
		return crypto.randomBytes(byteSize).toString('base64');
	}

	encryptPassword(password: string, salt: string): any {
		const saltBuffer = new Buffer(salt, 'base64');
		const defaultIterations = 10000;
		const defaultKeyLength = 64;

		return crypto.pbkdf2Sync(password, saltBuffer, defaultIterations, defaultKeyLength, 'sha512').toString('base64');

	};

	randNum(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}

	authenticate(dbPassword: string, dbSalt: string, providedPassword: string) {
		return this.encryptPassword(providedPassword, dbSalt) === dbPassword;
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

	getCredentials(email: string): Promise<any> {
		return client.execute(this.credentials, [email], this.queryOptions);
	}

	updatePassword(email: string, oldPW: string, newPass: string, res): Promise<any> {

		return this.getCredentials(email).then(result => {
			const dbPW: string = result.rows[0].password;
			const dbSalt: string = result.rows[0].salt;
			if (this.authenticate(dbPW, dbSalt, oldPW)) {
				const byteSize: number = 16;
				const newSalt: string = this.makeSalt(byteSize);
				const newHashedPW = this.encryptPassword(newPass, newSalt);
				return client.execute(this.updatePw, [newHashedPW, newSalt, email], this.queryOptions);
			}
			else {
				res.status(403).end();
			}
		}).catch(err => console.error(err));

	}

	insertUser(email: string, username: string, password: string): Promise<any> {

		const byteSize: number = 16;
		const id: string = String(Uuid.random());
		const salt: string = this.makeSalt(byteSize);
		const newHashedPW = this.encryptPassword(password, salt);
		const queryOptions = {
			prepared: true
		};
		return client.execute(insertUser, [id, email, Date.now(), newHashedPW, salt, 'user', username], queryOptions);
	}

}

export default new UserModel;