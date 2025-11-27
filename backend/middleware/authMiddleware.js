const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  // Expect token in Authorization: Bearer <token>
  const header = req.header('Authorization');
  const token = header && header.startsWith('Bearer ') ? header.replace('Bearer ', '') : null;

  if (!token) {
    // For the API we return 401; front-end will handle redirect to login/signup modal
    return res.status(401).json({ message: 'No token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach full user object (except password) to req
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });
    if (user.blocked) return res.status(403).json({ message: 'User is blocked' });

    req.user = user; // user doc
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }
};
