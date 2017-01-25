const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy
// 第二个参数是函数，it's a function that's going to be called whenever user tries to login with jwt,
// or whenever we need to authenticate user with jwt token
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
//  payload: is the decoded jwt token
//  done: is a callback function we need to call, depending on whether or not we are able to successfully authenticate this user

//  See if the user ID in the payload exists in our database
//  If it does, call 'done' with that user
//  otherwise, call 'done' without a user object
  User.findById(payload.sub, function (err, user) {
    if (err){
      return done(err, false);
    }
    if (user) {
      done(null, user)
    }
    else {
      done(null, false)
    }
  })
});



// Tell passport to use this strategy
passport.use(jwtLogin);









