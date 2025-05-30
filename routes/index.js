const routes = require("express").Router();
const chirpController = require("../controller");
const chirperController = require("../controller/chirper")
const validation = require("../middleware/validate");
const swaggerUIroute = require("./swagger");



routes.get("/", (req, res) => {
  res.send("Welcome to Chirp!🐣")
});
routes.use("/", swaggerUIroute)

// GET ROUTES
routes.get("/chirps", chirpController.getAllChirps);
routes.get("/chirps/:id", chirpController.getOneChirp);
routes.get("/chirp/error", chirpController.createServererror);
routes.get("/chirpers", chirperController.getChirpers);


routes.post("/chirps", validation.addChirp, chirpController.addChirp);
routes.put("/chirps/:id", validation.updateChirp, chirpController.updateChirp);

routes.delete("/chirps/:id", chirpController.deleteChirp);

module.exports = routes