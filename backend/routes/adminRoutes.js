const express = require('express');
const router = express.Router();
const admin = require('../middleware/adminMiddleware');
const auth = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

// all admin routes require auth + admin
router.use(auth, admin);

// Users
router.get('/users', adminController.getAllUsers);
router.post('/users/:id/block', adminController.blockUser);
router.post('/users/:id/unblock', adminController.unblockUser);
router.delete('/users/:id', adminController.deleteUser);

// Questions
router.get('/questions', adminController.manageQuestions.list);
router.delete('/questions/:id', adminController.manageQuestions.delete);
router.put('/questions/:id', adminController.manageQuestions.update);

// Answers
router.get('/answers', adminController.manageAnswers.list);
router.delete('/answers/:id', adminController.manageAnswers.delete);
router.put('/answers/:id', adminController.manageAnswers.update);

// Topics listing for admin
router.get('/topics', adminController.manageTopics.list);

module.exports = router;
