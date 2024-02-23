// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import navigationReducer from './Reducer/NavigationReducer'

// Define persistConfig
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export type RootState = ReturnType<typeof rootReducer>;
// Create root reducer
const rootReducer = combineReducers({
  navigation: navigationReducer,
  // Add other reducers here...
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
});

// Create persisted store
export const persistor = persistStore(store);
