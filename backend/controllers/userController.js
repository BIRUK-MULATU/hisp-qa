const User = require('../models/User');

exports.getMyProfile = async (req, res) => {
  try {
    const user = req.user;
    res.json(user); // already has no password field due to select in middleware
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyQuestionsAndAnswers = async (req, res) => {
  try {
    const userId = req.user._id;
    const Question = require('../models/Question');
    const Answer = require('../models/Answer');

    const questions = await Question.find({ user: userId }).sort({ createdAt: -1 }).populate('topic').lean();
    const answers = await Answer.find({ user: userId }).sort({ createdAt: -1 }).populate('question', 'title').lean();

    res.json({ questions, answers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin-only user management (but for adminRoutes controller uses adminController)
