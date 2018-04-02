// Load required packages
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('./usermodule');

    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = process.env.MYKEY;

    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {


        User.findOne({name:jwt_payload.name,username:jwt_payload.username},function(err,user) {
            if(err)
            { return done(err,false);
            }
            if(user){
                process.env.USERNAME=jwt_payload.username;

               return done(null,user);
            }
            else {
              return   done(null,false);
            }
        });

        }));

    exports.isAuthenticated = passport.authenticate('jwt', {session: false});
    exports.secret = opts.secretOrKey;
