import { configureStore } from '@reduxjs/toolkit';
import { brandsApiSlice } from '@/features/brands/brandsApiSlice';
import { categoriesApiSlice } from '@/features/categories/categoriesApiSlice';
import { itemsApiSlice } from '@/features/items/itemsApiSlice';
import { mainApiSlice } from '@/features/main/mainApiSlice';
import { authApiSlice } from '@/features/auth/authApiSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [mainApiSlice.reducerPath]: mainApiSlice.reducer,
      [brandsApiSlice.reducerPath]: brandsApiSlice.reducer,
      [categoriesApiSlice.reducerPath]: categoriesApiSlice.reducer,
      [itemsApiSlice.reducerPath]: itemsApiSlice.reducer,
      [authApiSlice.reducerPath]: authApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(mainApiSlice.middleware)
        .concat(brandsApiSlice.middleware)
        .concat(categoriesApiSlice.middleware)
        .concat(itemsApiSlice.middleware)
        .concat(authApiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
