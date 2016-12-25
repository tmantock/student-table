const passport = require('passport');
const User = require('../models/user');
const config =  require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  //Verify email and password, call done with the user if correct credentials

  //Otherwise call done with false
  User.findOne({ email: email}, function (err, user) {
    if(err){ return done(err); }
    if(!user) {return done(null, false); }

    //compare passwords - is password === user.password

    user.comparePassword(password, function (err, isMatch) {
      if(err) {return done(err); }
      if(!isMatch) {return done(null, false); }

      return done(null, user);
    });
  });

});


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.sub, function (err, user) {
    if(err) { return done(err, false); }

    if(user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
});
//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
