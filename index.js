const express = require('express');
const fs = require('fs').promises;
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const { log } = console;
const talkersData = 'talker.json';

function generateRandomToken() {
  return crypto.randomBytes(8).toString('hex');
}

app.get('/talker', async (req, res) => {
  try {
    const talkers = await fs.readFile(talkersData, 'utf-8');
    return res.status(HTTP_OK_STATUS).json(JSON.parse(talkers));
  } catch (error) {
    log(error);
  }
});

app.get('/talker/:id', async (req, res) => {
  try {
    const talkers = await fs.readFile(talkersData, 'utf-8');
    log(talkers);
    const { id } = req.params;
    log(id);

    const parsedTalkers = JSON.parse(talkers);

    const talkerData = parsedTalkers.find((talker) => talker.id === Number(id));

    if (!talkerData) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(HTTP_OK_STATUS).json(talkerData);
  } catch (error) {
    log(error);
  }
});

app.post('/login', (req, res) => {
  const newToken = generateRandomToken();
  res.status(HTTP_OK_STATUS).json({ token: `${newToken}` });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});
 
app.listen(PORT, () => {
  console.log('Server Online');
});
