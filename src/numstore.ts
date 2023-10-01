import { TReducers } from './store';

// Типы действаий с числом
export const ActionTypes = {
  INCREMENT_NUM_ACTION: 'INCREMENT_NUM_ACTION',
  DECRIMENT_NUM_ACTION: 'DECRIMENT_NUM_ACTION',
  SET_NUM_ACTION: 'SET_NUM_ACTION',
};

// Начальное значение числа
export const InitialValue = { num: 0 };

export const Reducers: TReducers = {
  // Reducer для увеличения числа
  [ActionTypes.INCREMENT_NUM_ACTION]: (state, action) =>
    // По умолчанию увеличиваем на 1
    (state.num += action.pyload ? action.pyload : 1),
  // Reducer для уменьшения числа
  [ActionTypes.DECRIMENT_NUM_ACTION]: (state, action) =>
    // По умолчанию уменьшаем на 1
    (state.num -= action.pyload ? action.pyload : 1),
  // Reducer для присвоения числа
  [ActionTypes.SET_NUM_ACTION]: (state, action) =>
    // По умолчанию присваеваем 0
    (state.num = action.pyload ? action.pyload : 0),
};
