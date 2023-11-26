import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BACKEND_URL } from '../const'

// Запрос на поиск географического объекта
export const logonDataAPI = createApi({
  reducerPath: 'logonDataAPI',
  baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
  endpoints: (builder) => ({
    getLogonData: builder.query({
      // Конструируем запрос
      query: (s) => `/user?${new URLSearchParams(s)}`,
    }),
  }),
})
export const { useLazyGetLogonDataQuery } = logonDataAPI
