import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import store from "../store"

const geoSearchSlice = createSlice({
  name: "geoSerch",
  initialState: { geoSearch: "" },
  reducers: {
    setGeoSearch(state, action: PayloadAction<string>) {
      state.geoSearch = action.payload
    },
  },
})
export const { setGeoSearch } = geoSearchSlice.actions
export default geoSearchSlice.reducer
export const geoSearchSelector = (state: ReturnType<typeof store.getState>) => {
  return state.Reducer.geoSearchReducer.geoSearch
}
