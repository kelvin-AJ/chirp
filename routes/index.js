const routes = require("express").Router();
const chirpController = require("../controller")

routes.get("/", (req, res) => {
  res.send("Welcome to Chirp!🐣")
});

routes.get("/chirps", chirpController.getAllChirps);
routes.get("/chirps/:id", chirpController.getOneChirp);
routes.post("/chirps", chirpController.addChirp);

module.exports = routes