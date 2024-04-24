import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { SortListItem } from '../../components/Sort';
import { SortItemIndexEnum } from '../../components/Sort';

export interface FilterSliceState {
  searchValue: string;
  activeCategoryId: number;
  activeSort: SortListItem;
  currnetPage: number;
}

const initialState: FilterSliceState = {
  searchValue: '',
  activeCategoryId: 0,
  activeSort: {
    name: 'популярности (по убыванию)',
    index: SortItemIndexEnum.RatingAsc,
  },
  currnetPage: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.activeCategoryId = action.payload;
    },
    setSorting: (state, action: PayloadAction<SortListItem>) => {
      state.activeSort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currnetPage = action.payload;
    },
    setFiltersParams: (state, action: PayloadAction<FilterSliceState>) => {
      state.activeCategoryId = Number(action.payload.activeCategoryId);
      state.currnetPage = Number(action.payload.currnetPage);
      state.activeSort = action.payload.activeSort;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectFilterActiveSort = (state: RootState) => state.filter.activeSort;

export const { setCategoryId, setSorting, setCurrentPage, setFiltersParams, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
