import mongoose from 'mongoose'
import { GEOOBJECT_MONGO_COLLECTION } from '../const'

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
  { collection: GEOOBJECT_MONGO_COLLECTION },
)

export const geoObjectModel = mongoose.model(
  GEOOBJECT_MONGO_COLLECTION,
  geoObjectSchema,
)
