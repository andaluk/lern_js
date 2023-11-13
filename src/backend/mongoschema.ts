import mongoose from 'mongoose'

// Название коллекции
const MONGO_COLLECTION = 'history-query'

// Создаем схему
const geoObjectSchema = new mongoose.Schema(
  {
    geoObject: {
      type: Object,
    },
    weatherData: {
      type: Object,
    },
  },
  // Чтобы на конце имени коллекции не возникало s
  { collection: MONGO_COLLECTION },
)

export const geoObjectModel = mongoose.model(MONGO_COLLECTION, geoObjectSchema)
