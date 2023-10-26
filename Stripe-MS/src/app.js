import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import passport from 'passport';
import httpStatus from 'http-status';
//import eureka from config folder
import eurekaClient from './config/eureka-client-config.js';
import path from 'path';
import config from './config/config.js';
import { authLimiter } from './middlewares/rateLimiter.js';
import routes from './routes/index.js';
import { errorConverter, errorHandler } from './middlewares/error.js';
import ApiError from './utils/ApiError.js';
import session from 'express-session';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import GoogleStrategy from "passport-google-oauth20";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import morgan from "morgan";
const app = express();

eurekaClient.start((error) => {
  if (error) {
    console.error('Error registering with Eureka:', error);
  } else {
    console.log('Registered with Eureka');
  }
});

//Google Auth
app.use(cookieParser());
app.use(cookieSession({
  maxAge : 24 * 60 * 60 * 1000,
  keys : [process.env.COOKIE_KEY]

} ) );

app.get('/google', (req, res) => {
  res.send('<a href = " /auth/google">Login with Google</a>');
} );
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] } ));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev"));


if (config.env !== 'test') {
 //app.use(morgan.successHandler); **ERROR** TypeError: app.use() requires a middleware function
// app.use(morgan.errorHandler);
}

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// set security HTTP headers
app.use(helmet());
// parse json request body
app.use(express.json());
// session to support webauthn
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 86400000,
      httpOnly: true, // Ensure to not expose session cookies to clientside scripts
    },
  })
);
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// sanitize request data
app.use(xss());
app.use(mongoSanitize());
// gzip compression
app.use(compression());
// enable cors
app.use(cors());
app.options('*', cors());
// jwt authentication
app.use(passport.initialize());
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "473168806273-1uds5ipd22i7g1d6qgrhjokuagrlo35a.apps.googleusercontent.com",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "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",
    callbackURL: process.env.GOOGLE_CALLBACK_URL || "http://localhost:4000/api/auth/google/callback",
    passReqToCallback : true
  },
  async (request, accessToken, refreshToken, profile, cb) => {
    try {
      const existingUser = await User.findOne({ 'email': profile.emails[0].value });
      if (existingUser) {
        return cb(null, existingUser);
      }
      console.log('Creating new user...');

      const newUser = new User({

          email: profile.emails[0].value,
          lastName: profile.name.familyName,
          firstName: profile.name.givenName,
          password : `${profile.name.familyName}${profile.name.givenName}${profile.id}`,
          googleId: profile.id,
          profilePicture : profile.photos[0].value

      });
      const password = `${profile.name.familyName}${profile.name.givenName}${profile.id}`;
      const saltRounds = 10; // this is the number of rounds to hash the password
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          return cb(err, false);
        }
        newUser.password = hash;
      console.log(newUser);
       newUser.save();
      });
      return cb(null, newUser);
    } catch (error) {
      return cb(error, false)
    }
  }
));
passport.serializeUser((user, cb) => {
  console.log("Serializing user:", user);
  cb(null, user.id);
});
passport.deserializeUser(async (id, cb) => {
  const user = await User.findOne({ where: { id } }).catch((err) => {
    console.log("Error deserializing", err);
    cb(err, null);
  });
  console.log("DeSerialized user", user);
  if (user) cb(null, user);
});
// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/api/auth', authLimiter);
}
// v1 api routes
app.use('/api', routes);
app.use('/api/health-check', (req, res) => res.send('OK'));
// send back a 404 error for any unknown api request

// convert error to ApiError, if needed
app.use(errorConverter);
// handle error
app.use(errorHandler);
export default app;
