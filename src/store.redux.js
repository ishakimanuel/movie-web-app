import { configureStore } from '@reduxjs/toolkit';
import { movieDetailReducer } from 'pages/movies/movie-detail/movie-detail.redux';
import { movieSuggestionsReducer } from 'pages/movies/movie-list/movie-suggestions.redux';
import { movieListReducer } from './pages/movies/movie-list/movie-list.redux';

const store = configureStore({
  reducer: {
    movieList: movieListReducer,
    movieDetail: movieDetailReducer,
    movieSuggestions: movieSuggestionsReducer,
  },
});

export default store;
