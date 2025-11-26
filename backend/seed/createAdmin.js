require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const env = require('../config/env');

const run = async () => {
  await connectDB(env.MONGO_URI);

  const admin = await User.findOne({ isAdmin: true });
  if (admin) {
    console.log('Admin already exists:', admin.email);
    process.exit(0);
  }

  if (!env.FIRST_ADMIN_EMAIL || !env.FIRST_ADMIN_PASSWORD) {
    console.error('Set FIRST_ADMIN_EMAIL and FIRST_ADMIN_PASSWORD in .env');
    process.exit(1);
  }

  const hash = await bcrypt.hash(env.FIRST_ADMIN_PASSWORD, 12);
  const newAdmin = new User({
    name: 'Admin',
    email: env.FIRST_ADMIN_EMAIL,
    password: hash,
    isAdmin: true
  });

  await newAdmin.save();
  console.log('Admin created:', env.FIRST_ADMIN_EMAIL);
  process.exit(0);
};

run().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});