import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from 'common/constants/request.constant';
import apiService from 'common/services/api.service';

const { request, apiRequestReducer } = apiService('movieList');

export const setLastKeyword = createAction('setLastKeyword');

export const fetchMovieList = createAsyncThunk(
  'fetchMovieList',
  async (keyword, { getState, dispatch }) => {
    const { movieList } = getState();
    dispatch(setLastKeyword(keyword));
    const response = await request({
      query: {
        s: keyword,
        page: movieList.pagination.currentPage,
      },
    });
    return { ...response, keyword };
  }
);

const initialState = {
  list: [],
  requestStatus: REQUEST_STATUS.idle,
  pagination: {
    currentPage: 1,
    totalPage: 0,
    totalData: 0,
  },
  isNotFound: false,
  lastKeyword: 'batman',
};

const movieListSlice = createSlice({
  name: 'movieList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    apiRequestReducer(builder, fetchMovieList, {
      onPending: (state) => {
        state.isNotFound = false;
      },
      onFulfilled: (state, action) => {
        if (!action.payload.Error) {
          state.list = action.payload.Search;
          state.pagination.totalPage = action.payload.totalResults;
          state.lastKeyword = action.payload.keyword;
        } else {
          state.isNotFound = true;
        }
      },
    }).addCase(setLastKeyword, (state, action) => {
      state.lastKeyword = action.payload;
    });
  },
});

export const movieListReducer = movieListSlice.reducer;
export const movieListActions = movieListSlice.actions;

export default movieListSlice;
