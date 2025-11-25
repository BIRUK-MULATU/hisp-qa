const router = require("express").Router();
const auth = require("../middleware/auth");
const aCtrl = require("../controllers/answerController");

// MUST BE LOGGED IN to answer
router.post("/:questionId", auth, aCtrl.createAnswer);

module.exports = router;
