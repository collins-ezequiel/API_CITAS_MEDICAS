const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT tokens
// This middleware checks for a valid JWT token in the request headers

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access token is required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(
        res.status(403).json({
          error: 'You do not have permission to perform this action',
        })
      );
    }
  };
}

module.exports = { authenticateToken, checkRoles };
