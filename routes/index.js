const routes = require("express").Router();
const chirpController = require("../controller");
const chirperRoutes = require("./chirpers");
const swaggerUIroute = require("./swagger");
const validation = require("../middleware/validate");



routes.get("/", (req, res) => {
  res.send("Welcome to Chirp!🐣")
});
routes.use("/", swaggerUIroute)

// ROUTES (CHIRPS)
routes.get("/chirps", chirpController.getAllChirps);
routes.get("/chirps/:id", chirpController.getOneChirp);
routes.get("/chirp/error", chirpController.createServererror);



routes.post("/chirps", validation.addChirp, chirpController.addChirp);
routes.put("/chirps/:id", validation.updateChirp, chirpController.updateChirp);

routes.delete("/chirps/:id", chirpController.deleteChirp);

// ROUTES CHIRPERS
routes.use("/chirpers", chirperRoutes);


module.exports = routes