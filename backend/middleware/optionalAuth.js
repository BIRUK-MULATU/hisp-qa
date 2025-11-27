const authMiddleware = require('./authMiddleware');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(); // No token → guest
  }

  // Reuse auth middleware but don't fail on invalid token
  authMiddleware(req, res, (err) => {
    if (err) {
      return next(); // Invalid token → treat as guest
    }
    next(); // Valid → req.user set
  });
};