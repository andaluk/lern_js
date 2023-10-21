import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Тип для данных о загрязнении
export type weatherDataType =
  | {
      hourly: {
        time: string[];
        pm2_5: number[];
        pm10: number[];
        map: Map<string, number[]>;
      };
    }
  | undefined;

const weatherDataSlice = createSlice({
  name: 'WeatherData',
  initialState: { weatherData: undefined } as {
    weatherData: weatherDataType | undefined;
  },
  reducers: {
    setWeatherData(state, action: PayloadAction<weatherDataType>) {
      state.weatherData = action.payload;
    },
    clearWeatherData(state) {
      state.weatherData = undefined;
    },
  },
});
export const { setWeatherData, clearWeatherData } = weatherDataSlice.actions;
export default weatherDataSlice.reducer;
