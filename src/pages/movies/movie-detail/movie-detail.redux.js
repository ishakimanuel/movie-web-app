import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from 'common/constants/request.constant';
import apiService from 'common/services/api.service';

const { request, apiRequestReducer } = apiService('movieDetail');

export const fetchMovieDetail = createAsyncThunk(
  'fetchMovieDetail',
  async (id) => {
    const response = await request({
      query: {
        i: id,
      },
    });
    return response;
  }
);

const movieDetailSlice = createSlice({
  name: 'movieDetail',
  initialState: {
    detail: null,
    requestStatus: REQUEST_STATUS.idle,
  },
  extraReducers: (builder) => {
    apiRequestReducer(builder, fetchMovieDetail, {
      onFulfilled: (state, action) => {
        state.detail = action.payload;
      },
    });
  },
});

export const movieDetailReducer = movieDetailSlice.reducer;
export default movieDetailSlice;
