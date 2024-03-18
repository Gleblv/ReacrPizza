import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeCategoryId: 0,
  activeSort: {
    name: 'популярности (по убыванию)',
    index: 'rating',
  },
  currnetPage: 1,
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
    setCurrentPage: (state, action) => {
      state.currnetPage = action.payload;
    },
    setFiltersParams: (state, action) => {
      state.activeCategoryId = Number(action.payload.activeCategoryId);
      state.currnetPage = Number(action.payload.currnetPage);
      state.activeSort = action.payload.activeSort;
    },
  },
});

export const { setCategoryId, setSorting, setCurrentPage, setFiltersParams } = filterSlice.actions;

export default filterSlice.reducer;
