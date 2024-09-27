const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const {createUserIfNotExists} = require("../controllers/user.controllers")
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		async function (accessToken, refreshToken, profile, callback) {
			const user = await createUserIfNotExists(profile);
				console.log("user data",user)
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
