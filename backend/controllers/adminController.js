const User = require('../models/User');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const Topic = require('../models/Topic');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.blocked = true;
    await user.save();
    res.json({ message: 'User blocked' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.unblockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.blocked = false;
    await user.save();
    res.json({ message: 'User unblocked' });
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

exports.manageQuestions = {
  list: async (req, res) => {
    try {
      const questions = await Question.find().sort({ createdAt:-1 }).populate('topic').lean();
      res.json(questions);
    } catch (err) { res.status(500).json({ error: err.message }); }
  },
  delete: async (req, res) => {
    try {
      await Question.findByIdAndDelete(req.params.id);
      // optionally delete answers
      await Answer.deleteMany({ question: req.params.id });
      res.json({ message: 'Question and its answers deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
  },
  update: async (req, res) => {
    try {
      const q = await Question.findById(req.params.id);
      if (!q) return res.status(404).json({ message: 'Question not found' });
      const { title, body, topic } = req.body;
      if (title) q.title = title;
      if (body) q.body = body;
      if (topic !== undefined) q.topic = topic;
      await q.save();
      res.json(q);
    } catch (err) { res.status(500).json({ error: err.message }); }
  }
};

exports.manageAnswers = {
  list: async (req, res) => {
    try {
      const answers = await Answer.find().sort({ createdAt:-1 }).populate('user', 'name').populate('question', 'title').lean();
      res.json(answers);
    } catch (err) { res.status(500).json({ error: err.message }); }
  },
  delete: async (req, res) => {
    try {
      await Answer.findByIdAndDelete(req.params.id);
      res.json({ message: 'Answer deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
  },
  update: async (req, res) => {
    try {
      const a = await Answer.findById(req.params.id);
      if (!a) return res.status(404).json({ message: 'Answer not found' });
      a.body = req.body.body || a.body;
      await a.save();
      res.json(a);
    } catch (err) { res.status(500).json({ error: err.message }); }
  }
};

exports.manageTopics = {
  list: async (req, res) => {
    try {
      const topics = await Topic.find().sort({ title: 1 });
      res.json(topics);
    } catch (err) { res.status(500).json({ error: err.message }); }
  }
};
