import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type geoObjectType = { name: string };
const geoObjectSlice = createSlice({
  name: 'geoObject',
  initialState: { geoObject: undefined } as {
    geoObject: geoObjectType | undefined;
  },
  reducers: {
    setGeoObject(state, action: PayloadAction<geoObjectType>) {
      state.geoObject = action.payload;
    },
    clearGeoObject(state) {
      state.geoObject = undefined;
    },
  },
});
export const { setGeoObject, clearGeoObject } = geoObjectSlice.actions;
export default geoObjectSlice.reducer;
