const crypto = require('crypto');

function generateRandomToken() {
  return crypto.randomBytes(8).toString('hex');
}

function validateEmail(req, res, next) {
  const { email } = req.body;
  if (!email || email === '') { 
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  next();
}

function checkValidEmail(req, res, next) {
  const { email } = req.body;
  const pattern = /\S+@\S+.com/;
  const isEmailValid = pattern.test(email);
  if (!isEmailValid) { 
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
}
  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  if (!password || password === '') { 
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  next();
}

function checkValidPassword(req, res, next) {
  const { password } = req.body;
  const PASSWORD_MIN_LENGTH = 6;
  if (password.length < PASSWORD_MIN_LENGTH) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

module.exports = {
  generateRandomToken,
  validateEmail,
  checkValidEmail,
  validatePassword,
  checkValidPassword,
};