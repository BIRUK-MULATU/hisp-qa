const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true, trim: true },
  description: { type: String, default: '' },
  icon: { type: String, default: '' }, // For main topics (Lucide icon name)
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', default: null }, // If null, it's a Main Topic
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Topic', TopicSchema);
