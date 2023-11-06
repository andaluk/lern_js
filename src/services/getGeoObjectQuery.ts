import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_KEY_YANDEX, API_URL_GEO_DATA } from "../const"
import { geoObjectType } from "../slices"

// Запрос на поиск географического объекта
export const geoObjectAPI = createApi({
  reducerPath: "geoObjectAPI",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL_GEO_DATA }),
  endpoints: (builder) => ({
    getGeoObject: builder.query({
      // Конструируем запрос
      query: (s) =>
        `?${new URLSearchParams({
          apikey: API_KEY_YANDEX,
          format: "json",
          geocode: s,
        }).toString()}`,

      // Вытаскиваем из ответа данные о первом найденном объекте
      transformResponse: (res: {
        response: {
          GeoObjectCollection: {
            featureMember: { GeoObject: geoObjectType }[]
          }
        }
      }) => {
        if (res.response.GeoObjectCollection.featureMember.length)
          return res.response.GeoObjectCollection.featureMember[0].GeoObject
        // Если ничего не найдено обнуляем результат
        return undefined
      },
    }),
  }),
})
export const { useGetGeoObjectQuery } = geoObjectAPI
