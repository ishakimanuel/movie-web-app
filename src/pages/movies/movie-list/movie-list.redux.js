import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from 'common/constants/request.constant';
import apiService from 'common/services/api.service';

const { request, apiRequestReducer } = apiService('movieList');

export const fetchMovieList = createAsyncThunk(
  'fetchMovieList',
  async (keyword, { getState }) => {
    const { movieList } = getState();
    const response = await request({
      query: {
        s: keyword,
        page: movieList.pagination.currentPage,
      },
    });
    return response;
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
};

const movieListSlice = createSlice({
  name: 'movieList',
  initialState,
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
  },
  extraReducers: (builder) => {
    apiRequestReducer(builder, fetchMovieList, {
      onFulfilled: (state, action) => {
        state.list = action.payload.Search;
        state.pagination.totalPage = action.payload.totalResults;
      },
    });
  },
});

export const movieListReducer = movieListSlice.reducer;
export default movieListSlice;
