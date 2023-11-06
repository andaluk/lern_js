import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LOGIN_URL } from '../const'
//import { loginDataType } from '../slices'

// Запрос на поиск географического объекта
export const loginDataAPI = createApi({
  reducerPath: 'loginDataAPI',
  baseQuery: fetchBaseQuery({ baseUrl: LOGIN_URL }),
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
