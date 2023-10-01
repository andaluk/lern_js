import { TReducers } from './store';

// Типы акций с именем
export const ActionTypes = {
  SET_NAME_ACTION: 'SET_NAME_ACTION',
  CLEAR_NAME_ACTION: 'CLEAR_NAME_ACTION',
};

// Начальное значение для имени
export const InitialValue = { name: '' };

export const Reducers: TReducers = {
  // Reducer для SET_NAME_ACTION
  [ActionTypes.SET_NAME_ACTION]: (state, action) =>
    (state.name = action.pyload),
  // Reducer для CLEAR_NAME_ACTION
  [ActionTypes.CLEAR_NAME_ACTION]: (state) => (state.name = ''),
};
