const express = require("express");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const router = require("./routes");
const mongoDb = require("./database/connect");

const app = express();



const PORT = process.env.PORT || 8080;

// Resource sharing
const whitelist = [
  `http://localhost:${PORT}`,
  'http://localhost:3000',
  'https://chirp-w3e9.onrender.com',
];


const sessionOptions = {
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}

const gitHubStrategyOptions = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
}


const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`CORS blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  }
};




app.use(session(sessionOptions))
   .use(cors(corsOptions))
   .use(express.json())
   .use("/", router);


passport.use(new GitHubStrategy(gitHubStrategyOptions, 
    function(accessToken, refreshToken, profile, done) {

        return done(null, profile)
    }
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user)
})

app.get(
  "/", 
  (req, res) => {
    
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/api-docs", session: false }),
  (req, res) => {

    req.session.user = req.user;   
    res.redirect("/");
  }
);





process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);y
});

mongoDb.initializeDb((error) => {
    if(error) {
        console.log(error)
    }else {
        app.listen(PORT, () => {
        console.log(`Server is Running and listening on : http://localhost:${PORT}`);
        });
    };
});
