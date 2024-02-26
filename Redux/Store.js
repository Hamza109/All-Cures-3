// store.js
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import NavigationSlice from './Reducer/NavigationSlice';

// Define persistConfig
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Create root reducer
const rootReducer = combineReducers({
  // Add other reducers here...
  navigation: NavigationSlice,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
});

// Create persisted store
export const persistor = persistStore(store);
