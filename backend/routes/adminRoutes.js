const router = require("express").Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const adminCtrl = require("../controllers/adminController");

router.get("/", auth, admin, adminCtrl.getDashboardData);
router.delete("/user/:id", auth, admin, adminCtrl.deleteUser);

module.exports = router;
