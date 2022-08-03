function validateToken(req, res, next) {
  const token = req.headers.authorization;
  const TOKEN_LENGTH = 16;
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== TOKEN_LENGTH) return res.status(401).json({ message: 'Token inválido' });
  next();
}

function validateTalkerName(req, res, next) {
  const { name } = req.body;
  const NEW_TALKER_NAME_MIN_LENGTH = 3;
  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < NEW_TALKER_NAME_MIN_LENGTH) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
}

function validateTalkerAge(req, res, next) {
  const { age } = req.body;
  const NEW_TALKER_AGE_MIN = 18;
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (age < NEW_TALKER_AGE_MIN) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  next();
}

function validateTalkerTalk(req, res, next) {
  const { talk } = req.body;
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  next();
}

function validateTalkWatchedAt(req, res, next) {
  const { watchedAt } = req.body.talk;
  if (!watchedAt || watchedAt === '') {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  const dateValidate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)(\d{4})$/i;
  const isDateValid = dateValidate.test(watchedAt);
  if (!isDateValid) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
}

function validateTalkRate(req, res, next) {
  const { rate } = req.body.talk;
  if (rate < 1 || rate > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  if (!rate || rate === '') {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  next();
}

module.exports = {
  validateToken,
  validateTalkerName,
  validateTalkerAge,
  validateTalkerTalk,
  validateTalkWatchedAt,
  validateTalkRate,
};