import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LOGIN_URL } from '../const'

// Запрос на поиск географического объекта
export const logonDataAPI = createApi({
  reducerPath: 'logonDataAPI',
  baseQuery: fetchBaseQuery({ baseUrl: LOGIN_URL }),
  endpoints: (builder) => ({
    getLogonData: builder.query({
      // Конструируем запрос
      query: (s) =>
        `/user?${new URLSearchParams({
          login: s.Name,
          email: s.Mail,
          pass: s.Pass1,
        })}`,
    }),
  }),
})
export const { useLazyGetLogonDataQuery } = logonDataAPI
