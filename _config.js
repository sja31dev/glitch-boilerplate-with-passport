var ids = {
  github: {
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK
  },
  linkedin: {
    clientID: process.env.LINKEDIN_ID,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: process.env.LINKEDIN_CALLBACK
  },
  twitter: {
    consumerKey: process.env.TWITTER_ID,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK
  },
  facebook: {
    consumerKey: process.env.FACEBOOK_ID,
    consumerSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK
  }
};

module.exports = ids;