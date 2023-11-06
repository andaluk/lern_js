import mongoose from 'mongoose'

const geoObjectSchema = new mongoose.Schema({
  name: { type: String, require: true },
  pos: { type: String, require: true },
})

//export type geoObjectType = mongoose.InferSchemaType<typeof geoObjectSchema>
export const geoObject = mongoose.model('geoObject', geoObjectSchema)
