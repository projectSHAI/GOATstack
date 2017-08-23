import * as crypto from 'crypto';

class UserModel {

	salt: string;
	password: string;

	/*
	Auth
	*/

	encryptPassword(password: string, byteSize: number, salt?: string): any {

		const defaultIterations = 10000;
		const defaultKeyLength = 64;

		if (!salt) {
			salt = crypto.randomBytes(byteSize).toString('base64');
		}

		return {
			PW: crypto.pbkdf2Sync(password, this.salt, defaultIterations, defaultKeyLength, 'sha512').toString('base64'),
			salt: salt
		};

	};

	randNum(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
	}

	authenticate(password: string, salt: string) {
		return this.password === this.encryptPassword(password, 16, salt).PW;
	};

}

export default new UserModel;