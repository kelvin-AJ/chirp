const router = require("express").Router();
const chirperController = require("../controller/chirper")
const validation = require("../middleware/validate");

const {isAuthenticated} = require("../middleware/authenticate")


router.get("/", chirperController.getChirpers);
router.get("/:id", chirperController.getOneChirper);
router.post("/", isAuthenticated ,validation.addChirper, chirperController.addChirperAdimin);
router.put("/:id", isAuthenticated, validation.updateChirper, chirperController.updateChirper);
router.delete("/:id", isAuthenticated, chirperController.deleteChirper);


module.exports = router;