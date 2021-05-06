import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from 'common/constants/request.constant';
import apiService from 'common/services/api.service';

const { request, apiRequestReducer } = apiService('movieList');

export const setLastKeyword = createAction('setLastKeyword');

export const fetchMovieList = createAsyncThunk(
  'fetchMovieList',
  async ({ keyword, page = 1, isNextList }, { getState, dispatch }) => {
    dispatch(setLastKeyword(keyword));
    const response = await request({
      query: {
        s: keyword,
        page: page,
      },
    });

    if (isNextList && response.Search?.length) {
      response.Search.unshift(...getState().movieList.list);
    }

    return { ...response, keyword, page, isNextList };
  }
);

const calculateTotalPage = (limit, totalData) => {
  return Math.ceil(totalData / limit);
};

const initialState = {
  list: [],
  requestStatus: REQUEST_STATUS.idle,
  pagination: {
    currentPage: 1,
    totalPage: 0,
    limit: 10,
  },
  isNotFound: false,
  lastKeyword: 'batman',
  error: '',
};

const movieListSlice = createSlice({
  name: 'movieList',
  initialState,
  extraReducers: (builder) => {
    apiRequestReducer(builder, fetchMovieList, {
      onPending: (state) => {
        state.isNotFound = false;
        state.error = '';
      },
      onFulfilled: (state, action) => {
        if (!action.payload.Error) {
          state.lastKeyword = action.payload.keyword;
          state.list = action.payload.Search;
          state.pagination.currentPage = action.payload.page;
          state.pagination.totalPage = calculateTotalPage(
            state.pagination.limit,
            parseInt(action.payload.totalResults)
          );
        } else {
          state.isNotFound = true;
        }
      },
      onRejected: (state) => {
        state.error = 'Sorry, we are in the trouble. Please try again later..';
      },
    }).addCase(setLastKeyword, (state, action) => {
      state.lastKeyword = action.payload;
    });
  },
});

export const movieListReducer = movieListSlice.reducer;
export const movieListActions = movieListSlice.actions;

export default movieListSlice;
