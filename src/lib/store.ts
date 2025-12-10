import { configureStore } from '@reduxjs/toolkit';
import { brandsApiSlice } from '@/features/brands/brandsApiSlice';
import { categoriesApiSlice } from '@/features/categories/categoriesApiSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [brandsApiSlice.reducerPath]: brandsApiSlice.reducer,
      [categoriesApiSlice.reducerPath]: categoriesApiSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware()
        .concat(brandsApiSlice.middleware)
        .concat(categoriesApiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
