const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');
const auth = require('../middleware/authMiddleware');

// Post answer -> logged in required
router.post('/:questionId', auth, answerController.createAnswer);

// Get answers for question (public)
router.get('/:questionId', answerController.getAnswersForQuestion);

module.exports = router;
