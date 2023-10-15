import React, { Dispatch, SetStateAction } from 'react';

// Тип географического объекта, найденного в yandex
export type geoObjectType =
  | {
      name: string; // Название объекта
      Point: {
        pos: string; // Строка с координатами
      };
    }
  | undefined;

// Контекст для географического объекта, найденного в yandex
export const GeoObjectContext = React.createContext<
  [geoObjectType, Dispatch<SetStateAction<geoObjectType>> | undefined]
>([undefined, undefined]);
