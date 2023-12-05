import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './userReducer';
import fileReducer from './fileReducer';
import appReducer from './appReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    files: fileReducer,
    app: appReducer
  },
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
