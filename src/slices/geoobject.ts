import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import store from '../store';

// Описываем тип географического объекта
export type geoObjectType =
  | { name: string; Point: { pos: string } }
  | undefined;

// создаем в хранилище раздел для географического объекта
const geoObjectSlice = createSlice({
  name: 'geoObject',
  initialState: { geoObject: undefined } as {
    geoObject: geoObjectType;
  },
  reducers: {
    // Редюсер присвоения значения географическому объекту
    setGeoObject(state, action: PayloadAction<geoObjectType>) {
      state.geoObject = action.payload;
    },
    // Редюсер сброса значения географического объекта
    clearGeoObject(state) {
      state.geoObject = undefined;
    },
  },
});

// Возвращаем построители действий (Action Creator)
export const { setGeoObject, clearGeoObject } = geoObjectSlice.actions;
export default geoObjectSlice.reducer;
// Возвращаем функцию выборки значения географического объекта
export const geoObjectSelector = (state: ReturnType<typeof store.getState>) => {
  return state.Reducer.geoObjectReducer.geoObject;
};
