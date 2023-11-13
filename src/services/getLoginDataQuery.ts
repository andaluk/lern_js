import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_URL } from '../const'

// Запрос на поиск географического объекта
export const loginDataAPI = createApi({
  reducerPath: 'loginDataAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  endpoints: (builder) => ({
    getLoginData: builder.query({
      // Конструируем запрос
      query: (s) => ({
        method: 'POST',
        url: '/login',
        body: s,
      }),
    }),
  }),
})
export const { useLazyGetLoginDataQuery } = loginDataAPI
