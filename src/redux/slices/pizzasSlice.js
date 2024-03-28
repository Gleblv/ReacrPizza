import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: 'loading',
};

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasAll', async (params) => {
  const { categoryType, filtredSortString, filtredType, search, currnetPage } = params;

  const { data } = await axios.get(
    `https://65cbe753efec34d9ed8840df.mockapi.io/items?page=${currnetPage}&limit=4&${categoryType}&sortBy=${filtredSortString}&order=${filtredType}${search}`,
  );

  return data;
});

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
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
