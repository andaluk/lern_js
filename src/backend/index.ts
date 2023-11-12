import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import { geoObject } from './mongoschema'

const MONGO_URL = 'mongodb://127.0.0.1/my_database'
const PORT = 3001

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
  // Если были переданы нужные данные
  if (req.query.login && req.query.email) {
    // Возвращаем заглушку в формате JSON
    res.json({ login: req.query.login, email: req.query.email })
  } else {
    // Если данные не были переданы, отвечаем сообщением о ошибке
    res.status(400).send('Bad request.')
  }
})

// Обрабатываем POST на путь /login
app.post('/login', (req: Request, res: Response) => {
  // У POST данные передаются в теле запроса
  if (req.body.email) {
    // Если нужные данные были переданы, возвращаем
    // заглушку в формате JSON
    res.json({ login: req.body.email, email: req.body.email })
  } else {
    // Если данные не были переданы, отвечаем сообщением о ошибке
    res.status(400).send('Bad request.')
  }
})

// Записываем в mongodb результаты поиска
app.post('/geoobject', (req: Request, res: Response) => {
  if (req.body.name && req.body.pos) {
    const go = new geoObject({
      name: req.body.name,
      pos: req.body.pos,
    })
    go.save()
  }
})

mongoose.connect(MONGO_URL)

mongoose.connection
  .on('error', console.error)
  .on('disconnected', () => mongoose.connect(MONGO_URL))
  .once('open', () => {
    // Ждем запросов на нужном порту
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
  })
