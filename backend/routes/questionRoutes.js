const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const auth = require('../middleware/auth');

// Create question
router.post('/', auth, async (req,res)=>{
  try{
    const question = new Question({...req.body,user:req.user});
    await question.save();
    res.status(201).json(question);
  } catch(err){ res.status(500).json({ error:err.message }); }
});

// Get all questions
router.get('/', async (req,res)=>{
  try{
    const questions = await Question.find().sort({ createdAt:-1 });
    res.json(questions);
  } catch(err){ res.status(500).json({ error:err.message }); }
});

// Get single question with answers
router.get('/:id', async (req,res)=>{
  try{
    const question = await Question.findById(req.params.id);
    const answers = await Answer.find({ question:req.params.id });
    res.json({ question, answers });
  } catch(err){ res.status(500).json({ error:err.message }); }
});

// Upvote question
router.post('/:id/upvote', auth, async (req,res)=>{
  try{
    const question = await Question.findById(req.params.id);
    question.votes += 1;
    await question.save();
    res.json(question);
  } catch(err){ res.status(500).json({ error:err.message }); }
});

// Downvote question
router.post('/:id/downvote', auth, async (req,res)=>{
  try{
    const question = await Question.findById(req.params.id);
    question.votes -= 1;
    await question.save();
    res.json(question);
  } catch(err){ res.status(500).json({ error:err.message }); }
});

module.exports = router;
