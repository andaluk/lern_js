import { combineReducers } from '@reduxjs/toolkit';
import weatherDataReducer from './weatherdata';
import geoObjectReducer from './geoobject';
export * from './weatherdata';
export * from './geoobject';

export default combineReducers({
  weatherDataReducer,
  geoObjectReducer,
});
