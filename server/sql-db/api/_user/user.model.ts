import Sequelize from "sequelize";
import sequelize from "../../../sql-db";
import * as crypto from "crypto";

let User = sequelize.define("user", {
	  username:  {type: Sequelize.STRING, 
	  	unique: true,
	  	validate: {
	  		notEmpty: {
	  			args: true,
	  			msg: 'A user needs at least a username'
	  		}
	  	}
	  },
	  firstname: {type: Sequelize.STRING},
	  lastname:  {type: Sequelize.STRING},
	  email:     {type: Sequelize.STRING,
	  	unique: true,
	  	validate: {
	  		notEmpty: {
	  			args: true,
	  			msg: 'Email cannot be blank'
	  		}
	  	}
	  },
	  password:  {type: Sequelize.STRING,
	  	validate: {
	  		notEmpty: {
	  			args: true,
	  			msg: 'Password cannot be blank'
	  		}
	  	}},
	  salt:      {type: Sequelize.STRING}
	},{
		hooks: {
			beforeCreate: function(user, options, next) {								

				// Make salt with a callback
				user['makeSalt']((saltErr, salt) => {
				  if (saltErr) {
				    return next(saltErr);
				  }
				  user['salt'] = salt;
				  user['encryptPassword'](user['password'], (encryptErr, hashedPassword) => {
				    if (encryptErr) {
				      return next(encryptErr);
				    }
				    user['password'] = hashedPassword;
				    next();
				  });
				});
			}    
		},

		instanceMethods: {
			/**
			 * Authenticate - check if the passwords are the same
			 *
			 * @param {String} password
			 * @param {Function} callback
			 * @return {Boolean}
			 * @api public
			 */
			authenticate(password, callback) {
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
			},

			/**
			 * Make salt
			 *
			 * @param {Number} byteSize Optional salt byte size, default to 16
			 * @param {Function} callback
			 * @return {String}
			 * @api public
			 */
			makeSalt(byteSize, callback): any {
			  let defaultByteSize = 16;

			  if (typeof arguments[0] === 'function') {
			    callback = arguments[0];
			    byteSize = defaultByteSize;
			  } else if (typeof arguments[1] === 'function') {
			    callback = arguments[1];
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
			},

			/**
			 * Encrypt password
			 *
			 * @param {String} password
			 * @param {Function} callback
			 * @return {String}
			 * @api public
			 */
			encryptPassword(password, callback): any {
			  if (!password || !this.salt) {
			    if (!callback) {
			      return null;
			    } else {
			      return callback('Missing password or salt');
			    }
			  }

			  let defaultIterations = 10000;
			  let defaultKeyLength = 64;
			  let salt = new Buffer(this.salt, 'base64');

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
			}
		}
	});

export default User;
