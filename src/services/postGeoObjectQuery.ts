import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_URL } from '../const'

// Запрос на сохранение географического объекта
export const postGeoObjectAPI = createApi({
  reducerPath: 'postGeoObjectAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  endpoints: (builder) => ({
    postGeoObject: builder.query({
      // Конструируем запрос
      query: (s) => ({
        method: 'POST',
        url: '/geoobject',
        body: s,
        // Будет возвращать строку состояния
        responseHandler: (res) => res.text(),
      }),
    }),
  }),
})
export const { useLazyPostGeoObjectQuery } = postGeoObjectAPI
