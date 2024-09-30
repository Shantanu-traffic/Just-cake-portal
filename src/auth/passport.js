const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const {createUserIfNotExists} = require("../controllers/user.controllers")
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		async function (accessToken, refreshToken, profile, callback) {
			const user = await createUserIfNotExists(profile);
				
				return callback(null, user); // Pass the user object to the next middleware
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
