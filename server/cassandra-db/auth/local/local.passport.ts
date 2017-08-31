import * as passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

import { findByEmail } from '../../api/user/prepared.statements';

// This is the authentication process that happens in passport before the
// router callback function.
// When done is called the items will be passed to the callback function in
// local.router.ts
function localAuthenticate(UserModel, email, password, done) {
  let user;

  UserModel.getCredentials(email).then( result => {
    
    if (Object.keys(result.rows).length > 1) {
      //TODO send an email to admin account notifying multiple users with the same credentials
      return done(null, false, { message: 'There was more than one user!' });
    }
    else if(Object.keys(result.rows).length < 1){
      return done(null, false, { message: 'Account does not exist!' });
    }
    else {
      const dbPW: string = result.rows[0].password;
      const dbSalt: string = result.rows[0].salt;
      if (UserModel.authenticate(dbPW, dbSalt, password)) {
        user = result.rows[0];
        delete user.password;
        delete user.salt;
        return done(null, user);
      }
      else {
        return done(null, false, { message: 'This password is not correct!' });
      }
    }


  })
  .catch(err => {
    console.error('This email is not registered!', email);
    done(null, false, { message: 'This email is not registered!' + email });
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

export {setup as localSetup};
