require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'Hey! this is Secret! so Shhh! 🤫';

module.exports = {
  generateToken({ id, username, email, role }) {
    const token = jwt.sign({ id, username, email, role }, SECRET, {
      expiresIn: '7d',
    });
    return token;
  },
  verifyToken: token => jwt.verify(token, SECRET),
};
