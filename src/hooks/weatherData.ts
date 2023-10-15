import React, { Dispatch, SetStateAction } from 'react';

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
export const WeatherDataContext = React.createContext<
  [weatherDataType, Dispatch<SetStateAction<weatherDataType>> | undefined]
>([undefined, undefined]);
