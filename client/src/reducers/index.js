import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import userReducer from './userReducer'
import fileReducer from './fileReducer'
import tariffReducer from './tariffReducer'
import appReducer from './appReducer'
import busyDataReducer from './busyDataReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    files: fileReducer,
    tariff: tariffReducer,
    app: appReducer,
    busy: busyDataReducer,
  },
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production'
})

export default store 
