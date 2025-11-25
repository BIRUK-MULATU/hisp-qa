const Question = require('../models/Question');
const Answer = require('../models/Answer');

exports.createQuestion = async (req, res) => {
  try {
    const q = new Question({
      title: req.body.title,
      body: req.body.body,
      topic: req.body.topic || null,
      user: req.user || null
    });

    await q.save();
    res.status(201).json(q);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  const questions = await Question.find().populate('topic').sort({ createdAt: -1 });
  res.json(questions);
};

exports.getSingleQuestion = async (req, res) => {
  const question = await Question.findById(req.params.id).populate('topic');
  const answers = await Answer.find({ question: req.params.id }).populate("user");

  res.json({ question, answers });
};
