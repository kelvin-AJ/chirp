const routes = require("express").Router();
const chirpRoutes = require("./chirps")
const chirperRoutes = require("./chirpers");
const swaggerUIroute = require("./swagger");
const passport = require("passport");



// routes.get("/", (req, res) => {
//   res.send("Welcome to Chirp!🐣")
// });

routes.use("/", swaggerUIroute);
routes.use("/chirps", chirpRoutes);
routes.use("/chirpers", chirperRoutes);

routes.get("/login", passport.authenticate("github"), (req, res) => {});
routes.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {return next(err)}
    res.redirect("/")
  })
})


module.exports = routes;