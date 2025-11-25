const router = require("express").Router();
const auth = require("../middleware/auth");
const qCtrl = require("../controllers/questionController");

// Anyone can create a question (no login required)
router.post("/", qCtrl.createQuestion);

router.get("/", qCtrl.getAllQuestions);
router.get("/:id", qCtrl.getSingleQuestion);

module.exports = router;
