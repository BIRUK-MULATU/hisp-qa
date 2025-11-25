const Topic = require('../models/Topic');

exports.getTopics = async (req, res) => {
  try {
    const topics = await Topic.find().sort({ title: 1 });
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTopic = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Title required' });
    const exist = await Topic.findOne({ title });
    if (exist) return res.status(400).json({ message: 'Topic already exists' });
    const topic = new Topic({ title, description: description || '' });
    await topic.save();
    res.status(201).json(topic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    const { title, description } = req.body;
    if (title) topic.title = title;
    if (description !== undefined) topic.description = description;
    await topic.save();
    res.json(topic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: 'Topic not found' });
    await topic.deleteOne();
    res.json({ message: 'Topic deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
