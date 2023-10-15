const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Подключаем URL encoded парсер
app.use(bodyParser.urlencoded());

// Подключаем и настраиваем cors
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
  })
);

const PORT = 3001;

// Обрабатываем запрос GET на путь /user
app.get('/user', (req, res) => {
  // Если были переданы нужные данные
  if (req.query.login && req.query.email) {
    // Возвращаем заглушку в формате JSON
    res.json({ login: req.query.login, email: req.query.email });
  } else {
    // Если данные не были переданы, отвечаем сообщением о ошибке
    res.status(400).send('Bad request.');
  }
});

// Обрабатываем POST на путь /login
app.post('/login', (req, res) => {
  // У POST данные передаются в теле запроса
  if (req.body.email) {
    // Если нужные данные были переданы, возвращаем
    // заглушку в формате JSON
    res.json({ login: req.body.email, email: req.body.email });
  } else {
    // Если данные не были переданы, отвечаем сообщением о ошибке
    res.status(400).send('Bad request.');
  }
});

// Ждем запросов на нужном порту
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
