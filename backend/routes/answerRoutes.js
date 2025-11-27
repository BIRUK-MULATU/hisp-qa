const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answerController');
const auth = require('../middleware/authMiddleware');

// Post answer -> logged in required
router.post('/:questionId', auth, answerController.createAnswer);

// Get answers for question (public)
// Get answers for question (public)
router.get('/:questionId', answerController.getAnswersForQuestion);

// Admin routes
router.get('/', auth, answerController.getAllAnswers);
router.delete('/:id', auth, answerController.deleteAnswer);

module.exports = router;
