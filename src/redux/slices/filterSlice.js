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
  },
});

export const { setCategoryId, setSorting, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
