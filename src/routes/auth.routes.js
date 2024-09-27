const router = require("express").Router();
const passport = require("passport");

// router.get("/login/success", (req, res) => {
//     console.log("login success",req.user)
// 	if (req.user) {
// 		res.status(200).json({
// 			error: false,
// 			message: "Successfully Loged In",
// 			user: req.user,
// 		});
//         res.redirect()
// 	} else {
// 		res.status(403).json({ error: true, message: "Not Authorized" });
// 	}
// });

// router.get("/login/failed", (req, res) => {
//     console.log("failed login",req.user)
// 	res.status(401).json({
// 		error: true,
// 		message: "Log in failure",
// 	});
// });

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
    "/google/callback",
    passport.authenticate("google",{
      successRedirect: "/login/success",  // Redirect to client after success
    //   successRedirect: process.env.CLIENT_URL,  // Redirect to client after success
      failureRedirect: "/login/failed",
      
      
    }),
    (req, res) => {
        console.log("data receive",req.user)
      // Save user information to the session (no need to regenerate session)
      req.session.user = req.user;  // Store user data in the session
      res.json({ success: true });
    }
  );


  // router.get("/logout", (req, res) => {
  //   req.logout();         // Logout the user
  //   req.session = null;   // Clear the session
  //   res.redirect(process.env.CLIENT_URL);  // Redirect to client URL after logout
  // });

  
module.exports = router;
