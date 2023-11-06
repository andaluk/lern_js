import { combineReducers } from '@reduxjs/toolkit'
import weatherDataReducer from './weatherdata'
import geoObjectReducer from './geoobject'
import geoSearchReducer from './geosearch'
import loginDataReducer from './logindata'
export * from './weatherdata'
export * from './geoobject'
export * from './geosearch'
export * from './logindata'

export default combineReducers({
  weatherDataReducer,
  geoObjectReducer,
  geoSearchReducer,
  loginDataReducer,
})
