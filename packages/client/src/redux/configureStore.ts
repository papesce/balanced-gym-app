import { configureStore } from '@reduxjs/toolkit';
import { gymApi } from './api';

export const store = configureStore({
  reducer: {
    [gymApi.reducerPath]: gymApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gymApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
