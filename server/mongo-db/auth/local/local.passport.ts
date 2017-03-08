import * as passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

// This is the authentication process that happens in passport before the
// router callback function.
// When done is called the items will be passed to the callback function in
// local.router.ts
function localAuthenticate(User, email, password, done) {
  User.findOne({
      email: email.toLowerCase()
    }).exec()
    .then(user => {
      if (!user) {
        return done(null, false, {
          message: 'This email is not registered!'
        });
      }
      user.authenticate(password, (authError, authenticated) => {
        if (authError) {
          return done(authError);
        }
        if (!authenticated) {
          return done(null, false, {
            message: 'This password is not correct!'
          });
        } else {
          return done(null, user);
        }
      });
    })
    .catch(err => done(err));
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
