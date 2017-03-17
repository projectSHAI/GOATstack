import * as passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
// import {cassClient} from '../../server';

// This is the authentication process that happens in passport before the
// router callback function.
// When done is called the items will be passed to the callback function in
// local.router.ts
function localAuthenticate(User, email, password, done) {
  let user;
  User.find({ email: email }).seam().subscribe(
    ur => user = ur, 
    err => done(null, false, { message: 'This email is not registered!' }), 
    () => {
      if (Array.isArray(user)) {
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

function setup(User, config) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, function (email, password, done) {    
    return localAuthenticate(User, email, password, done);
  }));
}

export {setup as localSetup};
