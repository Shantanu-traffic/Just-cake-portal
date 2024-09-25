const express = require("express");
const app = express();
require("dotenv").config();
const masterDb = require("./config/db.connect");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const adminRouter = require("./routes/admin.routes");
const { createError, errorHandler } = require("./middleware/errorHandler.middleware");
require("./auth/google.auth");
const cors = require('cors');
const cartRouter = require("./routes/cart.routes");
const orderRouter = require("./routes/order.routes");
const PORT = process.env.PORT;



// middleware 
app.use(cors())
app.use(express.json());


// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/public", "index.html"));
});
app.use('/api/v1/admin',adminRouter)
app.use('/api/v1/cart',cartRouter)
app.use('/api/v2/order',orderRouter)

app.use(errorHandler)


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
app.use("*",(req,res,next)=>{
  return next(createError(`${req.originalUrl} this url does not exist`,500,"global error"))
})
server.on("error", (error) => {
  console.log("Error Found While Server Connect", error);
});
