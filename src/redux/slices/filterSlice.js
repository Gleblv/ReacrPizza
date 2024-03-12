import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategoryId: 0,
  activeSort: {
    name: 'популярности (по убыванию)',
    index: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.activeCategoryId = action.payload;
    },
    setSorting: (state, action) => {
      state.activeSort = action.payload;
    },
  },
});

export const { setCategoryId, setSorting } = filterSlice.actions;

export default filterSlice.reducer;
