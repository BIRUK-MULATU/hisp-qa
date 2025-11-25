const Answer = require('../models/Answer');

exports.createAnswer = async (req, res) => {
  try {
    const a = new Answer({
      body: req.body.body,
      question: req.params.questionId,
      user: req.user
    });

    await a.save();
    res.status(201).json(a);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
