const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const loginValidations = require('./login.js');
const talkerValidations = require('./talker.js');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const { log } = console;
const talkersData = 'talker.json';

app.get('/talker', (req, res) => {
  const talkers = JSON.parse(fs.readFileSync(talkersData, 'utf-8'));
  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', (req, res) => {
    const talkers = fs.readFileSync(talkersData, 'utf-8');
    const { id } = req.params;

    const parsedTalkers = JSON.parse(talkers);
    const talkerData = parsedTalkers.find((talker) => talker.id === Number(id));

    if (!talkerData) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(HTTP_OK_STATUS).json(talkerData);
});

app.post('/login',
  loginValidations.validateEmail,
  loginValidations.checkValidEmail,
  loginValidations.validatePassword,
  loginValidations.checkValidPassword,
  (req, res) => {
  const newToken = loginValidations.generateRandomToken();
  res.status(HTTP_OK_STATUS).json({ token: `${newToken}` });
});

app.post('/talker',
  talkerValidations.validateToken,
  talkerValidations.validateTalkerName,
  talkerValidations.validateTalkerAge,
  talkerValidations.validateTalkerTalk,
  talkerValidations.validateTalkRate,
  talkerValidations.validateTalkWatchedAt,
  (req, res) => {
  const { body } = req;
  const talkers = JSON.parse(fs.readFileSync(talkersData, 'utf-8'));
  const id = talkers.length + 1;
  const newTalker = {
    id,
    ...body,
  };
  log(talkers, newTalker);
  talkers.push(newTalker);
  fs.writeFileSync('talker.json', JSON.stringify(talkers));
  res.status(201).json(newTalker);
});

app.put('/talker/:id', 
talkerValidations.validateToken,
talkerValidations.validateTalkerName,
talkerValidations.validateTalkerAge,
talkerValidations.validateTalkerTalk,
talkerValidations.validateTalkRate,
talkerValidations.validateTalkWatchedAt,
  (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const numberId = Number(id);
    const talkers = JSON.parse(fs.readFileSync(talkersData, 'utf-8'));
    let editTalker = talkers.find((talker) => talker.id === numberId);
    // filtar os palestrantes tirando o achado
    const newTalkers = talkers.filter((talker) => talker !== editTalker);
    editTalker = {
      id: numberId,
      ...body,
    };
    // inserir o novo palestrante no array
    newTalkers.push(editTalker);
    log('sem json', newTalkers);
    log('com json', JSON.stringify(newTalkers));
    fs.writeFileSync('talker.json', JSON.stringify(newTalkers));
    res.status(HTTP_OK_STATUS).json(editTalker);
});

app.delete('/talker/:id', 
  talkerValidations.validateToken,
  (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);
  const talkers = JSON.parse(fs.readFileSync(talkersData, 'utf-8'));
  const newTalkers = talkers.find((talker) => talker.id !== numberId);
  fs.writeFileSync('talker.json', JSON.stringify(newTalkers));
  res.status(204).end();
  res.send('olá');
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
 
app.listen(PORT, () => {
  console.log('Server Online');
});
