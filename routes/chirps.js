const routes = require("express").Router();
const chirpController = require("../controller");
const validation = require("../middleware/validate");
const {isAuthenticated} = require("../middleware/authenticate");


routes.get("/", chirpController.getAllChirps);
routes.get("/:id", chirpController.getOneChirp);
routes.get("/error", chirpController.createServererror);
routes.post("/", isAuthenticated , validation.addChirp, chirpController.addChirp);
routes.put("/:id", isAuthenticated , validation.updateChirp, chirpController.updateChirp);
routes.delete("/:id", isAuthenticated , chirpController.deleteChirp);


module.exports = routes