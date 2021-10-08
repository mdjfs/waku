import dotenv from "dotenv";
dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRET_KEY || "",
  database: {
    uri: process.env.DATABASE_URI || "",
    useSSL: process.env.DATABASE_USE_SSL || false,
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL: process.env.GOOGLE_CALLBACK_URL || "",
  },
  facebook: {
    clientID: process.env.FACEBOOK_CLIENT_ID || "",
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    callbackURL: process.env.FACEBOOK_CALLBACK_URL || "",
  },
  catApi: {
    key: process.env.CAT_API_KEY || "",
    url: process.env.CAT_API_URL || "",
  },
};

const obligatory = [
  "SECRET_KEY",
  "DATABASE_URI",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_CALLBACK_URL",
  "FACEBOOK_CLIENT_ID",
  "FACEBOOK_CLIENT_SECRET",
  "FACEBOOK_CALLBACK_URL",
  "CAT_API_KEY",
  "CAT_API_URL",
];

for (const prop of obligatory) {
  if (!process.env[prop]) {
    throw new Error(
      `Property ${prop} is undefined in enviroment variables and is obligatory. `
    );
  }
}

export default config;
