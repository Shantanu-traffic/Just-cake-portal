const express = require("express");
require("dotenv").config();
const masterDb = require("./config/db.connect");
const cookieSession = require("cookie-session");
const passport = require("passport");
const productRouter = require("./routes/product.routes");
const { createError, errorHandler } = require("./middleware/errorHandler.middleware");
const passportStrategy = require("./auth/passport");
const cors = require('cors');
const authRoute = require("./routes/auth.routes");
const cartRouter = require("./routes/cart.routes");
const orderRouter = require("./routes/order.routes");
const mailRouter = require("./routes/mail.routes");
const payementRouter = require("./routes/payement.routes");
const PORT = process.env.PORT;


const app = express();


app.use(
  cookieSession({
    name: "session",
    keys: ["Techverse"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use(
  cors({
    origin: "http://localhost:5002",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

app.use(express.json())


app.use("/auth", authRoute);
app.use('/api/v1/product',productRouter)
app.use('/api/v1/cart',cartRouter)
app.use('/api/v1/order',orderRouter)
app.use('/api/v1/mail',mailRouter)
app.use('/api/v1/payment',payementRouter)






app.get("/login/success", (req, res) => {
  
if (req.user) {
  res.cookie('user', JSON.stringify(req.user));
      res.redirect(process.env.CLIENT_URL)
} else {
  res.status(403).json({ error: true, message: "Not Authorized" });
}
});

app.get("/login/failed", (req, res) => {
  
res.status(401).json({
  error: true,  
  message: "Log in failure",
});
});



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
app.use(errorHandler)
server.on("error", (error) => {
  console.log("Error Found While Server Connect", error);
});
