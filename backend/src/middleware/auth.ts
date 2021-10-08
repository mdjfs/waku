import Google from "passport-google-oauth20";
import Facebook from "passport-facebook";
import config from "../config";
import User from "../database/models/user";
import Provider from "../database/models/provider";

/**
 * Base function for OAUTH Strategy calls
 */
function providerAuth(accessToken, refreshToken, profile, cb) {
  const getUser = ([provider]: [Provider, boolean]) => {
    User.findOrCreate({
      where: {
        userId: profile.id,
        providerId: provider.id,
        name: profile.displayName,
      },
    })
      .then(([user]) => cb(null, user))
      .catch((err) => cb(err, null));
  };
  Provider.findOrCreate({ where: { name: profile.provider } })
    .then(getUser)
    .catch((err) => cb(err, null));
}

// handle google OAUTH
const google = new Google.Strategy(config.google, providerAuth);

// handle facebook OAUTH
const facebook = new Facebook.Strategy(config.facebook, providerAuth);

export { facebook, google };
