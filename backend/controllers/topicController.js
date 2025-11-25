const Topic = require("../models/Topic");

exports.getTopics = async (req, res) => {
  const topics = await Topic.find().sort({ name: 1 });
  res.json(topics);
};

exports.createTopic = async (req, res) => {
  try {
    const topic = new Topic({ name: req.body.name });
    await topic.save();
    res.status(201).json(topic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    res.json(topic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTopic = async (req, res) => {
  try {
    await Topic.findByIdAndDelete(req.params.id);
    res.json({ message: "Topic deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
