const { Router } = require("express");
const { authController } = require("../controllers");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");

const router = Router();

router.get("/signup", authController.getSignUp);
router.post("/signup", authController.postSignUp);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.getLogOut);

router.get("*", checkUser);
router.get("/", (req, res) => res.render("home"));
router.get("/docs", requireAuth, (req, res) => res.render("docs"));

module.exports = router;
