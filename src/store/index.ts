import {configureStore} from '@reduxjs/toolkit';
import {cryptoApi} from './apis/crypto';
import userReducer from './slices/user';
import coinsReducer from './slices/coins';

export const store = configureStore({
  reducer: {
    user: userReducer,
    coins: coinsReducer,
    // Api reducers
    [cryptoApi.reducerPath]: cryptoApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
