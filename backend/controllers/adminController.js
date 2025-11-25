const User = require("../models/User");
const Question = require("../models/Question");
const Answer = require("../models/Answer");
const Topic = require("../models/Topic");

exports.getDashboardData = async (req, res) => {
  const users = await User.find();
  const questions = await Question.find();
  const answers = await Answer.find();
  const topics = await Topic.find();

  res.json({ users, questions, answers, topics });
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};
