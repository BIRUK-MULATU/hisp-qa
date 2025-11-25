const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.get('/me', auth, userController.getMyProfile);
router.get('/me/content', auth, userController.getMyQuestionsAndAnswers);

module.exports = router;
