const Topic = require('../models/Topic');

exports.getTopics = async (req, res) => {
  try {
    // Return all topics. Frontend will organize them.
    const topics = await Topic.find().sort({ title: 1 });
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTopic = async (req, res) => {
  try {
    const { title, description, icon, parent } = req.body;
    if (!title) return res.status(400).json({ message: 'Title required' });

    // Check duplicate title (scoped to same parent level ideally, but global unique for now is simple)
    const exist = await Topic.findOne({ title });
    if (exist) return res.status(400).json({ message: 'Topic already exists' });

    const topic = new Topic({
      title,
      description: description || '',
      icon: icon || '',
      parent: parent || null
    });
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

    const { title, description, icon } = req.body;
    if (title) topic.title = title;
    if (description !== undefined) topic.description = description;
    if (icon !== undefined) topic.icon = icon;

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

    // Delete the topic
    await topic.deleteOne();

    // Also delete any subtopics (where parent == this topic)
    await Topic.deleteMany({ parent: req.params.id });

    res.json({ message: 'Topic and its subtopics deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
