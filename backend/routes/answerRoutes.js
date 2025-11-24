const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const auth = require('../middleware/auth');

// Post answer
router.post('/:questionId', auth, async (req,res)=>{
  try{
    const answer = new Answer({ question:req.params.questionId, body:req.body.body, user:req.user });
    await answer.save();
    res.status(201).json(answer);
  } catch(err){ res.status(500).json({ error:err.message }); }
});

// Upvote answer
router.post('/:id/upvote', auth, async (req,res)=>{
  try{
    const answer = await Answer.findById(req.params.id);
    answer.votes += 1;
    await answer.save();
    res.json(answer);
  } catch(err){ res.status(500).json({ error:err.message }); }
});

// Downvote answer
router.post('/:id/downvote', auth, async (req,res)=>{
  try{
    const answer = await Answer.findById(req.params.id);
    answer.votes -= 1;
    await answer.save();
    res.json(answer);
  } catch(err){ res.status(500).json({ error:err.message }); }
});

module.exports = router;
