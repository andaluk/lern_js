import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL_METEO_DATA } from '../const';
import { geoObjectType, weatherDataType } from '../slices';

// Собирает последовательности времен измерений на каждую дату
const reduceFunc = (
  accum: Map<string, number[]>,
  value: string,
  index: number
) => {
  const d = new Date(value).toLocaleDateString();
  if (!accum.has(d)) {
    accum.set(d, []);
  }
  accum.get(d)!.push(index);
  return accum;
};

// Запрос данных о загрязнении
export const weatherDataAPI = createApi({
  reducerPath: 'weatherDataAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL_METEO_DATA }),
  endpoints: (builder) => ({
    getWeatherData: builder.query<weatherDataType, geoObjectType>({
      // Конструируем запрос
      query: (geoObject: geoObjectType) => {
        if (!geoObject) return '';
        const pos = geoObject.Point.pos.split(' ');
        return `?${new URLSearchParams({
          hourly: 'pm10,pm2_5',
          latitude: pos[0],
          longitude: pos[1],
        }).toString()}`;
      },

      // В результате собираем последовательности времен измерений на каждую дату
      transformResponse: (res: weatherDataType) => {
        if (res) res.hourly.map = res.hourly.time.reduce(reduceFunc, new Map());
        return res;
      },
    }),
  }),
});
export const { useGetWeatherDataQuery } = weatherDataAPI;
