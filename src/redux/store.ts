import { configureStore } from '@reduxjs/toolkit';
import eSimReducer from './slices/eSimSlice';

export const store = configureStore({
  reducer: {
    eSim: eSimReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;