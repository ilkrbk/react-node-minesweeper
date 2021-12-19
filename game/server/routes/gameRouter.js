const Router = require("express");
const router = new Router();
const gameController = require("../controllers/gameController");
const checkRole = require("../middleware/checkRole");
const auth = require("../middleware/auth");

router.post("/", auth, gameController.create);
router.get("/", auth, gameController.getWinGames);
router.get("/all", auth, gameController.getAllGames);
router.delete("/", checkRole("ADMIN"), gameController.delete);

module.exports = router;
