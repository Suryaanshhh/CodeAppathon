
const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return (req, res, next) => {
    // req.user is populated by the Auth middleware via JWT
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: "Access Denied: You do not have the required permissions." 
      });
    }
    next();
  };
};

module.exports = authorize;