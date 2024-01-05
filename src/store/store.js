import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import postReducer from './slices/postSlice'
import userReducer from './slices/userSlice'
import jobReducer from './slices/jobSlice'
import notificationReducer from './slices/notificationSlice'
import chatReducer from './slices/chatSlice'



const persistConfig = {
    key: 'root',
    storage
}


const combinedReducer = combineReducers({
    post: postReducer,
    user: userReducer,
    job: jobReducer,
    notification: notificationReducer,
    chat: chatReducer
})


const persistedReducer = persistReducer(persistConfig, combinedReducer)


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});



export default store