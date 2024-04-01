import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
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
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
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

export const selectFilter = (state) => state.filter;
export const selectFilterActiveSort = (state) => state.filter.activeSort;

export const { setCategoryId, setSorting, setCurrentPage, setFiltersParams, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
