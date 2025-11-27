const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  body: { type: String, required: true },
  topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', default: null }, // topic optional, guest can ask general
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // guest post -> null
  createdAt: { type: Date, default: Date.now }
});


// Text index for fast searching
module.exports = mongoose.model('Question', QuestionSchema);
