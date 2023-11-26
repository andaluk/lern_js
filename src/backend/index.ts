import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import { geoObjectModel } from './mongoGOschema'
import { MONGO_URL, BACKEND_PORT } from '../const'
import { loginModel } from './mongoLoginSchema'

const app: Express = express()

// Подключаем URL encoded парсер
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

// Подключаем и настраиваем cors
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST'],
  }),
)

// Обрабатываем запрос GET на путь /user
app.get('/user', (req: Request, res: Response) => {
  loginModel
    // Пытаемся сохранить данные в mongodb
    .create({
      Mail: req.query.Mail,
      Name: req.query.Name,
      Pass: req.query.Pass,
    })
    // Если удачно сохранили
    .then(({ _id, Name, Mail }) => {
      // Пишем лог
      console.log('Сохранен новый пользователь', { _id, Name, Mail })
      // Возвращаем информацию о пользователе
      res.json({ Name, Mail })
    })
    // Если не удалось сохранить
    .catch(() => {
      // отвечаем сообщением о ошибке
      res.status(400).send('Bad request.')
    })
})

// Обрабатываем POST на путь /login
app.post('/login', (req: Request, res: Response) => {
  const qdata = { Mail: req.body.Mail, Pass: req.body.Pass }
  console.log('Запрошен вход', qdata)

  loginModel
    // Ищем пользователя по почте и паролю
    .findOne(qdata, { Mail: 1, Name: 1 })
    .exec()
    // Если запрос прошел удачно
    .then((doc) => {
      if (doc?._id) {
        // Если нашли, посылаем информацию
        console.log('Найден пользователь', {
          _id: doc?._id,
          Mail: doc?.Mail,
          Name: doc?.Name,
        })
        res.json({ Mail: doc?.Mail, Name: doc?.Name })
      } else {
        // Если не нашли, возвращаем ошибку
        res.status(401).send('Ошибка авторизации.')
      }
    })
    // Ошибка про выполнении запроса
    .catch((reson) => {
      res.status(400).send(reson.toString)
    })
})

// Записываем в mongodb результаты поиска
app.post('/geoobject', (req: Request, res: Response) => {
  // Если данные присутствуют
  if (req.body.geoObject && req.body.weatherData) {
    geoObjectModel
      // Пытаемся сохранить данные
      .create({
        geoObject: req.body.geoObject,
        weatherData: req.body.weatherData,
      })
      // Все сохранилось
      .then(({ _id }) => {
        console.log('Документ записан.', _id)
        res.status(200).send(_id.toString())
      })
      // Сохранение не получилось
      .catch((reson) => {
        console.log('Документ не удалось сохранить.', reson)
        res.status(500).send('Internal server error.' + reson)
      })
  }
})

// Подклюсаем mogoose
mongoose.connect(MONGO_URL)

mongoose.connection
  // Подключение не удплось
  .on('error', console.error)
  // Подключение порвалось
  .on('disconnected', () => mongoose.connect(MONGO_URL))
  // Удачно подключились
  .once('open', () => {
    // Ждем запросов на нужном порту
    app.listen(BACKEND_PORT, () =>
      console.log(`Listening on port ${BACKEND_PORT}`),
    )
  })
