const JWTStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').extractJwt;
const user = require('../models/user');
const keys = require('./keys');

module.exports= function(passport){
    let opts = {};
    opts.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = keys.secretOrKey;
    passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
        user.findById(jwt_payload.id, (err, user) => {
          if (err) {
              return done(err, false);
          } 
          if (user) {
              return done(null, user);
          }
          else {
              return done(null, false);
          } 
        })
    }))

}