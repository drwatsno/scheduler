/**
 * Passport configuration file where you should configure strategies
 */
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;

let EXPIRES_IN_MINUTES = 60 * 24;
let SECRET = process.env.tokenSecret || "4ukI0uIVnB3iI1yxj646fVXSE3ZVk4doZgz6fTbNg7jO41EAtl20J5F7Trtwe7OM";
let ALGORITHM = "HS256";
let ISSUER = "nozus.com";
let AUDIENCE = "nozus.com";

/**
 * Configuration object for local strategy
 */
let LOCAL_STRATEGY_CONFIG = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: false
};

/**
 * Configuration object for JWT strategy
 */
let JWT_STRATEGY_CONFIG = {
    secretOrKey: SECRET,
    issuer : ISSUER,
    audience: AUDIENCE,
    passReqToCallback: false,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

/**
 * Triggers when user authenticates via local strategy
 */
function _onLocalStrategyAuth(email, password, next) {
  User.findOne({email: email})
    .exec(function (error, user) {
      if (error) return next(error, false, {});

      if (!user) return next(null, false, {
        code: 'E_USER_NOT_FOUND',
        message: email + ' is not found'
      });

      // TODO: replace with new cipher service type
      if (!CipherService.comparePassword(password, user))
        return next(null, false, {
          code: 'E_WRONG_PASSWORD',
          message: 'Password is wrong'
        });

      return next(null, user, {});
    });
}

/**
 * Triggers when user authenticates via JWT strategy
 */
function _onJwtStrategyAuth(payload, next) {
  let user = payload.user;
  return next(null, user, {});
}

passport.use(
  new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth));
passport.use(
  new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));

module.exports.jwtSettings = {
  expiresIn: EXPIRES_IN_MINUTES,
  secret: SECRET,
  algorithm : ALGORITHM,
  issuer : ISSUER,
  audience : AUDIENCE
};
