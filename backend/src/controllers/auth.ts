import passport from "passport";
import session from "express-session";
import { Application } from "express";
import User from "../database/models/user";
import config from "../config";
import { facebook, google } from "../middleware/auth";

/**
 * Initialize passport auth functions
 */
export function initialize(app: Application) {
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: config.secretKey,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(google);
  passport.use(facebook);
  passport.deserializeUser((userId: string, done) => {
    User.findOne({ where: { userId } })
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
  passport.serializeUser((data, done) => {
    const { userId } = data as User;
    done(null, userId);
  });
}

export default { initialize };
