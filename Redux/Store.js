import {configureStore, combineReducers} from '@reduxjs/toolkit';
import indexSlice from './Slice/indexSlice';
import screenSlice from './Slice/screenNameSlice';
import docSlice from './Slice/DoctorDetailSlice';
import profileSlice from './Slice/ProfileDataSlice';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import OptionSlice from './Slice/OptionSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import heightSlice from './Slice/heightSlice';
const rootReducer = combineReducers({
  screen: screenSlice,
  height: heightSlice,
  index: indexSlice,
  doc: docSlice,
  option:OptionSlice,
  profile: profileSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['screen', 'index', 'height'],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
