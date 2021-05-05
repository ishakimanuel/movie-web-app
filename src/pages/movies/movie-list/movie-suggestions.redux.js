import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from 'common/constants/request.constant';
import apiService from 'common/services/api.service';

const { request, apiRequestReducer } = apiService('movieSuggestions');

export const fetchMovieSuggestions = createAsyncThunk(
  'fetchMovieSuggestions',
  async (keyword) => {
    const response = await request({
      query: {
        s: keyword,
      },
    });
    return response;
  }
);

const initialState = {
  list: [],
  requestStatus: REQUEST_STATUS.idle,
};

const movieSuggestionsSlice = createSlice({
  name: 'movieSuggestions',
  initialState,
  reducers: {
    resetSuggestions: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    apiRequestReducer(builder, fetchMovieSuggestions, {
      onPending: (state) => {
        // state.list = [];
      },
      onFulfilled: (state, action) => {
        if (!action.payload.Error) {
          state.list = action.payload.Search;
        } else {
          state.list = [];
        }
      },
    });
  },
});

export const movieSuggestionsReducer = movieSuggestionsSlice.reducer;
export const movieSuggestionsActions = movieSuggestionsSlice.actions;

export default movieSuggestionsSlice;
