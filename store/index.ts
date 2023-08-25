import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import balanceReducer from './reducers'

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
}
const rootReducer = combineReducers({
  balance: balanceReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({ serializableCheck: false }),
  ],
  devTools: true,
})
