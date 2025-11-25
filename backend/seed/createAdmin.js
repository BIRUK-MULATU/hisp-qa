require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const EMAIL = process.env.FIRST_ADMIN_EMAIL;
const PWD = process.env.FIRST_ADMIN_PASSWORD;

if (!EMAIL || !PWD) {
  console.error('FIRST_ADMIN_EMAIL and FIRST_ADMIN_PASSWORD must be set in .env');
  process.exit(1);
}

const run = async () => {
  await connectDB(process.env.MONGO_URI);
  let admin = await User.findOne({ email: EMAIL });
  if (admin) {
    console.log('Admin already exists:', EMAIL);
    process.exit(0);
  }
  const hash = await bcrypt.hash(PWD, 10);
  admin = new User({ name: 'Admin', email: EMAIL, password: hash, isAdmin: true });
  await admin.save();
  console.log('Admin created:', EMAIL);
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });
