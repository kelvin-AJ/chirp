const router = require("express").Router();
const chirperController = require("../controller/chirper")
const validation = require("../middleware/validate");


router.get("/", chirperController.getChirpers);
router.get("/:id", chirperController.getOneChirper);
router.post("/", chirperController.addChirperAdimin);
router.put("/:id", chirperController.updateChirper);
router.delete("/:id", chirperController.deleteChirper);


module.exports = router;