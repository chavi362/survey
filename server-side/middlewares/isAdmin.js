const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).send('Requires admin role');
    }
    next();
  };
  module.exports = isAdmin;