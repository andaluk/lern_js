import { configureStore } from '@reduxjs/toolkit'
import Reducer from '../slices'
import thunk from 'redux-thunk'
import { weatherDataAPI } from '../services/getWeatherDataQuery'
import { geoObjectAPI } from '../services/getGeoObjectQuery'
import { loginDataAPI } from '../services/getLoginDataQuery'
import { logonDataAPI } from '../services/getLogonDataQuery'
import { postGeoObjectAPI } from '../services/postGeoObjectQuery'

const store = configureStore({
  reducer: {
    // Редюсеры данных
    Reducer,

    // Редюсеры запросов RTK Query
    [weatherDataAPI.reducerPath]: weatherDataAPI.reducer,
    [geoObjectAPI.reducerPath]: geoObjectAPI.reducer,
    [loginDataAPI.reducerPath]: loginDataAPI.reducer,
    [logonDataAPI.reducerPath]: logonDataAPI.reducer,
    [postGeoObjectAPI.reducerPath]: postGeoObjectAPI.reducer,
  },
  middleware: [
    thunk,
    weatherDataAPI.middleware,
    geoObjectAPI.middleware,
    loginDataAPI.middleware,
    logonDataAPI.middleware,
    postGeoObjectAPI.middleware,
  ],
})

export default store
