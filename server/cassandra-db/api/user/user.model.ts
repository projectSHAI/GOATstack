import * as crypto from 'crypto';
import * as Rx from 'rxjs';
import { client } from '../../../cassandra-db';
import { insertUser, destroyRow, findByEmail, allUsers } from './prepared.statements';

const Uuid = require('cassandra-driver').types.Uuid;

class UserModel {

	private salt: string;
	private password: string;

	/*
	Auth
	*/
	encryptPassword(password: string, byteSize, salt?: string): any {

		const defaultIterations = 10000;
		const defaultKeyLength = 64;

		if (!salt) {
			this.salt = crypto.randomBytes(byteSize).toString('base64');
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
		return this.password === this.encryptPassword(password, 16, salt);
	};

	/*
		Queries
	*/

	destroy(email: string): Rx.Observable<any> {
		return Rx.Observable.create(observer => {
			observer.next(() => {
				client.execute(destroyRow, [email], { prepare: true }, (err, result) => {
					if(err)
						console.error('Error with user.model destroy fn: ', err);
				});
			});
			observer.complete();
		});
	}

	allUsers(): Rx.Observable<any> {
		return Rx.Observable.create(observer => {
			observer.next(() => {
				client.execute(allUsers, (err, result) => {
					if(err)
						console.error('Error with user.model allUsers fn: ', err);
				});
			});
			observer.complete();
		});
	}

	query(query: string, params: Array<string>, prepared: object): Promise<any> {
			return client.execute(query, params, prepared);
	}

	userByEmail(email: string): Rx.Observable<any> {
		return Rx.Observable.create(observer => {
			observer.next((err, result) => { 
				client.execute(findByEmail, [email], { prepare: true })
					  .then(result => console.log('User with email %s', result.rows[0].email));
		});
			observer.complete();
		});
	}

	createUser(email: string, password: string, userName: string, role: string) {

		const id = Uuid.random();

		return Rx.Observable.create(observer => {
			observer.next(
				this.password = this.encryptPassword(password, 16)
			);
			observer.next(() => {
				client.execute(insertUser, [id, email, Date.now(), password, this.salt, role, userName], { prepare: true }, (err, result) => {
					if(err)
						console.error('Error with user.model createUser fn: ', err);
				});
			});
			observer.complete();
		});
	}

	/*
		Set helper functions for Entity
	*/



	/*
		Set validation functions for username and email
	*/

	// validate_email(email) {
	// 	return this.userByEmail(email).subscribe(
	// 		user => { },
	// 		err => console.error(err),
	// 		() => {
	// 			return 'email must be unique'
	// 		});
	// }

}

export default new UserModel;