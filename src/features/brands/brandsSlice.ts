import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BrandsItem {
  id: string;
  quantity: number;
}

interface BrandsState {
  items: BrandsItem[];
}

const initialState: BrandsState = { items: [] };

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<BrandsItem>) {
      state.items.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.id !== action.payload);
    }
  },
});

export const { addItem, removeItem } = brandsSlice.actions;
export const brandsReducer = brandsSlice.reducer;
