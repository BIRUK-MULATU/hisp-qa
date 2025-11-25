const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const topicCtrl = require("../controllers/topicController");

router.get("/", topicCtrl.getTopics);
router.post("/", auth, admin, topicCtrl.createTopic);
router.put("/:id", auth, admin, topicCtrl.updateTopic);
router.delete("/:id", auth, admin, topicCtrl.deleteTopic);

module.exports = router;
