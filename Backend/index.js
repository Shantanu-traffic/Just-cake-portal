const express = require("express");
const app = express();
require("dotenv").config();
const masterDb = require("./config/db");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
require("./auth/google.auth");
const PORT = process.env.PORT;



// middleware 
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Frontend", "index.html"));
});
// admin routes

// Configure session middleware
app.use(
  session({
    secret: "fakljdfk",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  (req, res) => {
    res.redirect("/auth/protected"); // Redirect to a route that can display user info
  }
);

//  failure
app.get("/auth/google/failure", (req, res) => {
  console.log("furkan....");
  res.send("Some thing went Wrong...");
});


// success
app.get("/auth/protected", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/google");
  }
  return res.status(200).json({
    success: true,
    message: "user login successfull",
    user: req.user,
  });
});

// logout functionality

app.use('/auth/logout',(req,res,next)=>{
  req.session.destroy();
  res.send('User Logout Successfully....')
})

const server = app.listen(PORT, () => {
  console.log(`SERVER RUN ON PORT ${PORT}`);
  connectToDb();
});

async function connectToDb() {
  try {
    const result = await masterDb.query("SELECT NOW()");
    console.log(`DB CONNECT SUCCESSFULLY`, result?.rows[0]);
  } catch (err) {
    console.error("Error connecting to masterDb:", err);
  }
}

server.on("error", (error) => {
  console.log("Error Found While Server Connect", error);
});
