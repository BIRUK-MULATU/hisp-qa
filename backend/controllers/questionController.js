const Question = require('../models/Question');
const Answer = require('../models/Answer');

exports.createQuestion = async (req, res) => {
  try {
    // Guests can create questions: req.user may be undefined
    const userId = req.user ? req.user._id : null;
    const { title, body, topic } = req.body;
    if (!title || !body) return res.status(400).json({ message: 'Title and body required' });

    const question = new Question({ title, body, topic: topic || null, user: userId });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    // return latest questions with answers and topic populated
    const questions = await Question.find().sort({ createdAt: -1 }).populate('topic').lean();
    // attach answers
    const ids = questions.map(q => q._id);
    const answers = await Answer.find({ question: { $in: ids } }).populate('user', 'name avatarUrl').lean();
    // map answers to questions
    const answersByQuestion = answers.reduce((acc, a) => {
      acc[a.question.toString()] = acc[a.question.toString()] || [];
      acc[a.question.toString()].push(a);
      return acc;
    }, {});
    const result = questions.map(q => ({ ...q, answers: answersByQuestion[q._id.toString()] || [] }));
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const q = await Question.findById(req.params.id).populate('topic').lean();
    if (!q) return res.status(404).json({ message: 'Question not found' });
    const answers = await Answer.find({ question: q._id }).populate('user', 'name avatarUrl').lean();
    res.json({ question: q, answers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchQuestions = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ message: 'Search query required' });
    // simple text search on title or body (add indexes if needed)
    const regex = new RegExp(q, 'i');
    const questions = await Question.find({ $or: [{ title: regex }, { body: regex }] }).sort({ createdAt: -1 }).populate('topic').lean();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
