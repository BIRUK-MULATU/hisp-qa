const Answer = require('../models/Answer');
const Question = require('../models/Question');

exports.createAnswer = async (req, res) => {
  try {
    const userId = req.user._id;
    const { questionId } = req.params;
    const { body } = req.body;

    if (!body?.trim()) {
      return res.status(400).json({ message: 'Answer body is required' });
    }

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const answer = await Answer.create({
      question: questionId,
      body: body.trim(),
      user: userId
    });

    // THIS IS THE CORRECT WAY (Mongoose 6+)
    await answer.populate('user', 'name avatarUrl');

    res.status(201).json(answer);
  } catch (err) {
    console.error('Answer creation error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAnswersForQuestion = async (req, res) => {
  try {
    const answers = await Answer.find({ question: req.params.questionId })
      .populate('user', 'name avatarUrl')
      .sort({ createdAt: -1 })
      .lean();
    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin methods
exports.getAllAnswers = async (req, res) => {
  try {
    const answers = await Answer.find()
      .populate('user', 'name email')
      .populate('question', 'title')
      .sort({ createdAt: -1 });
    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByIdAndDelete(req.params.id);
    if (!answer) return res.status(404).json({ message: 'Answer not found' });
    res.json({ message: 'Answer deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};