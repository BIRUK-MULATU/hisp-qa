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

// Admin-only user management
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
