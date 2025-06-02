const router = require("express").Router();
const chirperController = require("../controller/chirper")
const validation = require("../middleware/validate");


router.get("/", chirperController.getChirpers);
router.get("/:id", chirperController.getOneChirper);
router.post("/", validation.addChirper, chirperController.addChirperAdimin);
router.put("/:id", validation.updateChirper, chirperController.updateChirper);
router.delete("/:id", chirperController.deleteChirper);


module.exports = router;