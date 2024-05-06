import { applyMiddleware } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import { userReducer } from './userReducer'
import { fileReducer } from './fileReducer'
import { uploadReducer } from './uploadReducer'

export const store = configureStore({
   reducer: {
      user: userReducer,
      file: fileReducer,
      upload: uploadReducer,
   }
},
   applyMiddleware(thunk))