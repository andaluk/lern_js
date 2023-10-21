import { configureStore } from '@reduxjs/toolkit';
import Reducer from '../slices';
import thunk from 'redux-thunk';
const store = configureStore({
  reducer: {
    Reducer,
  },
  middleware: [thunk],
});

export default store;
