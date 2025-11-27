const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const auth = require('../middleware/authMiddleware');

// public: list
router.get('/', questionController.getAllQuestions);

// search
router.get('/search', questionController.searchQuestions);

// public: get single
router.get('/:id', questionController.getQuestionById);

// create question: guest allowed (but if user is logged in we can set req.user by using auth optionally)
// We'll allow both: if Authorization provided, authMiddleware sets req.user, otherwise next without error.
const optionalAuth = async (req, res, next) => {
  const header = req.header('Authorization');
  if (!header) return next();
  // require middleware
  return require('../middleware/authMiddleware')(req, res, next);
};

// Create question: works for both guest and logged-in users
router.post('/', optionalAuth, questionController.createQuestion);

// Admin delete
router.delete('/:id', auth, questionController.deleteQuestion);

module.exports = router;
