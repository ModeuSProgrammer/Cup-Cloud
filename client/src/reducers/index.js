import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './userReducer';
import fileReducer from './fileReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    files: fileReducer,
  },
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
