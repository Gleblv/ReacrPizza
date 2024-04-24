import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export enum LoadingStatus {
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

type FetchPizzasData = {
  categoryType: string;
  filtredSortString: string;
  filtredType: string;
  search: string;
  currnetPage: number;
};

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

interface PizzasSliceState {
  items: Pizza[];
  status: LoadingStatus;
}

const initialState: PizzasSliceState = {
  items: [],
  status: LoadingStatus.Loading,
};

export const fetchPizzas = createAsyncThunk(
  'pizzas/fetchPizzasAll',
  async (params: FetchPizzasData) => {
    const { categoryType, filtredSortString, filtredType, search, currnetPage } = params;

    const { data } = await axios.get<Pizza[]>(
      `https://65cbe753efec34d9ed8840df.mockapi.io/items?page=${currnetPage}&limit=4&${categoryType}&sortBy=${filtredSortString}&order=${filtredType}${search}`,
    );

    return data as Pizza[];
  },
);

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = LoadingStatus.Loading;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
        state.status = LoadingStatus.Success;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = LoadingStatus.Error;
        state.items = [];
      });
  },
});

export const selectPizzas = (state: RootState) => state.pizzas;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
