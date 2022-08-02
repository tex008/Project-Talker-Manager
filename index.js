const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const { log } = console;
const talkers = 'talker.json';

app.get('/talker', async (req, res) => {
  try {
    const talkersData = await fs.readFile(talkers, 'utf-8');
    return res.status(HTTP_OK_STATUS).json(JSON.parse(talkersData));
  } catch (error) {
    log(talkers);
  }
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Server Online');
});
