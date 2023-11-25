import mongoose from 'mongoose'
import { LOGIN_MONGO_COLLECTION, nameRegExp, mailRegExp } from '../const'

// Создаем схему
const loginSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      match: nameRegExp,
    },
    Mail: {
      type: String,
      required: true,
      match: mailRegExp,
    },
    Pass: {
      type: String,
      required: true,
    },
  },
  // Чтобы на конце имени коллекции не возникало s
  { collection: LOGIN_MONGO_COLLECTION },
)

export const loginModel = mongoose.model(LOGIN_MONGO_COLLECTION, loginSchema)
