import * as crypto from 'crypto';

import * as cassmask from 'cassmask';
import {uuid, toTimeStamp, now} from 'cassmask';

interface IUserSchema extends cassmask.ISchema {
	email?: cassmask.TEXT;
	password?: cassmask.TEXT;
	created?: cassmask.TIMESTAMP;

	username?: cassmask.TEXT;
	firstname?: cassmask.TEXT;
	lastname?: cassmask.TEXT;
	role?: cassmask.TEXT;
	facebook?: cassmask.TEXT;
	google?: cassmask.TEXT;
	github?: cassmask.TEXT;
	salt?: cassmask.TEXT;
}

class UserSchema extends cassmask.Schema {
	email = cassmask.TEXT;
	password = cassmask.TEXT;
	created = {
		type: cassmask.TIMESTAMP,
		default: toTimeStamp(now())
	};

	username = cassmask.TEXT;
	firstname = cassmask.TEXT;
	lastname = cassmask.TEXT;
	role = {
		type: cassmask.TEXT,
		default: 'user'
	};

	facebook = cassmask.TEXT;
	google = cassmask.TEXT;
	github = cassmask.TEXT;
	salt = cassmask.TEXT;
	keys = ['email', 'created', 'password', 'salt'];

	constructor() {
		super();
	}

	/*
		Set helper functions for Entity
	*/

	authenticate(password: string, callback?: Function) {
		if (!callback) {
		  return this.password === this.encryptPassword(password);
		}

		this.encryptPassword(password, (err, pwdGen) => {
	      if (err) {
	        return callback(err);
	      }

	      if (this.password === pwdGen) {
	        callback(null, true);
	      } else {
	        callback(null, false);
	      }
	    });
	};

	makeSalt(byteSize, callback?: Function): any {
	  let defaultByteSize = 16;

	  if (typeof byteSize === 'function') {
	    callback = byteSize;
	    byteSize = defaultByteSize;
	  }

	  if (!byteSize) {
	    byteSize = defaultByteSize;
	  }
	  
	  if (!callback) {
	    return crypto.randomBytes(byteSize).toString('base64');
	  }

	  return crypto.randomBytes(byteSize, (err, salt) => {
        if (err) {
          callback(err);
        } else {
          callback(null, salt.toString('base64'));
        }
      });
	};

	encryptPassword(password: string, callback?: Function): any {
	  if (!password || !this.salt) {
	    if (!callback) {
		  return null;
		} else {
		  return callback('Missing password or salt');
		}
	  }

	  const defaultIterations = 10000;
	  const defaultKeyLength = 64;
	  const salt = new Buffer(this.salt, 'base64');

	  if (!callback) {
	    return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, 'sha512')
	      .toString('base64');
	  }

	  return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha512', (err, key) => {
	    if (err) {
	      callback(err);
	    } else {
	      callback(null, key.toString('base64'));
	    }
	  });
	};

	/*
		Set validation functions for username and email
	*/

	validate_username(username, next) {
		return this.model.findOne({ username: username }).seam().subscribe(
			user => {},
			err => next(),
			() => next('username must be unique'));
	}

	validate_email(email, next) {
		return this.model.findOne({ email: email }).seam().subscribe(
			user => {},
			err => next(),
			() => next('email must be unique'));
	}

	/*
		Set Event hook functions for create and update
	*/
	
	pre_create(next, err) {
		if (!this.password) {
		  	return next();
		}
		// Make salt with a callback
	    this.makeSalt((saltErr, salt) => {
	      if (saltErr) {
	        return err(saltErr);
	      }
	      this.salt = salt;
	      this.encryptPassword(this.password, (encryptErr, hashedPassword) => {
	        if (encryptErr) {
	          return err(encryptErr);
	        }
	        this.password = hashedPassword;
	        next();
	      });
	    });
	}

	pre_update = this.pre_create;
}

export default cassmask.model<IUserSchema>('User', new UserSchema(), ['username']);