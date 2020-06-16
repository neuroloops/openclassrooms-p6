const jwt = require('jsonwebtoken');
const tokenKey = require('../secret/tokenKey');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, tokenKey);
    const { userId } = decodedToken;

    if (req.body.userId && req.body.userId !== userId) {
      throw new Error('Invalid user ID');
    } else {
      next();
    }
  } catch (e) {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
