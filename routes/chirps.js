const routes = require("express").Router();
const chirpController = require("../controller");
const validation = require("../middleware/validate");


routes.get("/", chirpController.getAllChirps);
routes.get("/:id", chirpController.getOneChirp);
routes.get("/error", chirpController.createServererror);
routes.post("/", validation.addChirp, chirpController.addChirp);
routes.put("/:id", validation.updateChirp, chirpController.updateChirp);
routes.delete("/:id", chirpController.deleteChirp);


module.exports = routes