const router = require("express").Router();
const passport = require("passport");

/** Public site base URL (no trailing slash), e.g. https://cakecrafts.co.nz */
const clientBase = () =>
  (process.env.CLIENT_URL || "http://localhost:5002").replace(/\/$/, "");

/** Where to send the user after Google login (must be a frontend route). */
const postOAuthPath = () => {
  const p = process.env.OAUTH_POST_LOGIN_PATH || "/";
  return p.startsWith("/") ? p : `/${p}`;
};

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${clientBase()}/forgot-password`,
    session: true,
  }),
  (req, res) => {
    if (!req.user) {
      return res.redirect(`${clientBase()}/login`);
    }
    const isProd = process.env.NODE_ENV === "production";
    res.cookie("user", JSON.stringify(req.user), {
      httpOnly: false,
      secure: isProd,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.redirect(`${clientBase()}${postOAuthPath()}`);
  }
);

module.exports = router;
