const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const user = require('../models/user');
const keys = require('./keys');

module.exports= function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = keys.secretOrkey;
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