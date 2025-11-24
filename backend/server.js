require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


// Routes

const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');

//use routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI) // <- make sure .env uses MONGO_URI
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));


// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 