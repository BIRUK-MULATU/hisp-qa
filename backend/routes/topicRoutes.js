const express = require('express');
const router = express.Router();
const topicController = require('../controllers/topicController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

// public
router.get('/', topicController.getTopics);

// admin only
router.post('/', auth, admin, topicController.createTopic);
router.put('/:id', auth, admin, topicController.updateTopic);
router.delete('/:id', auth, admin, topicController.deleteTopic);

module.exports = router;
