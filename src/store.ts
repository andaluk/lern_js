/**
 * Попытался уйти от swich-case, при этом реализовать
 * комбинирование редюсеров, начальных состояний, типов
 * действий и полей хранилища из разных модулей
 */
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {
  InitialValue as nameInitialValue,
  Reducers as nameReducers,
  ActionTypes as nameActionTypes,
} from './namestore';
import {
  InitialValue as numInitialValue,
  Reducers as numReducers,
  ActionTypes as numActionTypes,
} from './numstore';

// Собираем начальное значение полей
const InitialValue = { ...nameInitialValue, ...numInitialValue };

// Тип словаря редюсеров
export type TReducers = {
  [type: string]: (state: typeof InitialValue, action: any) => void;
};

// Собираем все типы действий для всех полей, чтобы работала проверка при написании
export const ActionTypes = {
  ...nameActionTypes,
  ...numActionTypes,
};

// Собираем все имеющиеся редюсеры
const Redusers: TReducers = {
  ...nameReducers,
  ...numReducers,
};

export const store = createStore(
  // Редюсер для обработки всех действий
  (state: any, action) => {
    // Если описан редюсер для данного типа действия
    if (action.type in Redusers) {
      // сразу создаем новое состояние, чтобы не сделать ошибку с
      // неизменяемостью потом
      const r = { ...state };
      // Выполняем редюсер для заданного типа акций
      Redusers[action.type](r, action);
      return r;
    }
    // Если тип действия не описан оставляес состояние неизменным
    return state;
  },

  InitialValue,
  composeWithDevTools(applyMiddleware(thunk))
);
