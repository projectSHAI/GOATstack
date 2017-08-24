import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { findByEmail } from '../../api/user/prepared.statements';

// This is the authentication process that happens in passport before the
// router callback function.
// When done is called the items will be passed to the callback function in
// local.router.ts
function localAuthenticate(UserModel, email, password, done) {
  let user;
  console.log('waddup', UserModel.userByEmail(email, (err, result) => {return result}).then(result => {return result}));

  UserModel.userByEmail(email, (err, result) => {
    console.log('adasdv');
    if (err) {
      done(null, false, { message: 'This email is not registered!' });
    }
    user = result.rows;
    console.log('aaaaaaaaza', user.length != 1);

    if (user.length != 1) {
      return done(null, false, { message: 'There was more than one user' });
    }

    user.authenticate(password, (err, auth) => {
      if (err) {
        return done(null, false, err);
      }
      if (!auth) {
        return done(null, false, { message: 'This password is not correct!' });
      } else {
        delete user.password;
        delete user.salt;
        return done(null, user);
      }

    });
  });

} 

function setup(UserModel, config) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, function (email, password, done) {
    return localAuthenticate(UserModel, email, password, done);
  }));
}

export { setup as localSetup };
