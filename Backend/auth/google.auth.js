const {createUserIfNotExists} = require('../controllers/user.controllers')
const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback"
},

async (accessToken, refreshToken, profile, cb) => {
  try {
    const user = await createUserIfNotExists(profile);
    console.log("user data",user)
    return cb(null, user); // Pass the user object to the next middleware
  } catch (err) {
    return cb(err);
  }
}
));

passport.serializeUser((user,done)=>{
    console.log("user get",user)
    return done(null,user)
})

passport.deserializeUser((user,done)=>{
  console.log("user get",user)
  return  done(null,user)
})