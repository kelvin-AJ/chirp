const routes = require("express").Router();
const chirpController = require("../controller");
const validation = require("../middleware/validate");
const swaggerUIroute = require("./swagger")



routes.get("/", (req, res) => {
  res.send("Welcome to Chirp!🐣")
});
routes.use("/", swaggerUIroute)

routes.get("/chirps", chirpController.getAllChirps);
routes.get("/chirps/:id", chirpController.getOneChirp);
routes.post("/chirps", validation.addChirp, chirpController.addChirp);
routes.put("/chirps/:id", validation.updateChirp, chirpController.updateChirp);
routes.delete("/chirps/:id", chirpController.deleteChirp);

module.exports = routes