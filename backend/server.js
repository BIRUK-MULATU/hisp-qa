require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const env = require('./config/env');

const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const answerRoutes = require('./routes/answerRoutes');
const topicRoutes = require('./routes/topicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Security & Logging
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com', 'https://hisp-qa.netlify.app'] 
    : '*'
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));

// ──────────────────────────────────────────────────────────────
// RATE LIMITING — FIXED FOR DEVELOPMENT & SAFE FOR PRODUCTION
// ──────────────────────────────────────────────────────────────

// 1. Very strict only on login/signup (prevents brute force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,                  // 20 attempts → safe but not annoying
  message: { error: 'Too many login attempts, try again later.' }
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/signup', authLimiter);

// 2. Gentle limit for everything else (you won't hit this during testing)
const generalLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 2000,                // 2000 requests per hour → impossible to hit locally
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', generalLimiter); // ← This is safe now!

// ──────────────────────────────────────────────────────────────

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

// Health checks
app.get('/api', (req, res) => res.json({ message: 'HISP Ethiopia Q&A API Running' }));
app.get('/api/health', (req, res) => res.json({ ok: true, uptime: process.uptime() }));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = env.PORT || 5000;

connectDB(env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Admin login: birukmulatukibret@gmail.com / 123456`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to DB:', err);
    process.exit(1);
  });