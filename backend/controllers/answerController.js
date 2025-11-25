const Answer = require('../models/Answer');
const Question = require('../models/Question');

exports.createAnswer = async (req, res) => {
  try {
    // only logged in users (middleware ensures req.user)
    const userId = req.user._id;
    const { questionId } = req.params;
    const { body } = req.body;
    if (!body) return res.status(400).json({ message: 'Answer body required' });

    // ensure question exists
    const q = await Question.findById(questionId);
    if (!q) return res.status(404).json({ message: 'Question not found' });

    const answer = new Answer({ question: questionId, body, user: userId });
    await answer.save();
    const populated = await answer.populate('user', 'name avatarUrl').execPopulate?.() || await Answer.findById(answer._id).populate('user', 'name avatarUrl');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAnswersForQuestion = async (req, res) => {
  try {
    const answers = await Answer.find({ question: req.params.questionId }).populate('user', 'name avatarUrl').lean();
    res.json(answers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
