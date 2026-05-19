const router = require("express").Router();
const passport = require("passport");

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/login/success", // Sets user cookie then redirects to CLIENT_URL
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    // Save user information to the session (no need to regenerate session)
    req.session.user = req.user; // Store user data in the session
    res.json({ success: true });
  }
);

// router.get("/logout", (req, res) => {
//   req.logout();         // Logout the user
//   req.session = null;   // Clear the session
//   res.redirect(process.env.CLIENT_URL);  // Redirect to client URL after logout
// });

module.exports = router;
