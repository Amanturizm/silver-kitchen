import { configureStore } from '@reduxjs/toolkit';
import { brandsReducer } from '@/features/brands/brandsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      brands: brandsReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
