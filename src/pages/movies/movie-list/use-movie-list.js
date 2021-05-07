import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieList } from './movie-list.redux';
import {
  fetchMovieSuggestions,
  movieSuggestionsActions,
} from './movie-suggestions.redux';

const useMovieList = () => {
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movieList);

  const [keyword, setKeyword] = React.useState(movieList.lastKeyword);

  React.useEffect(() => {
    dispatch(fetchMovieList({ keyword }));
  }, []);

  const onChangeInputSearch = (e) => {
    setKeyword(e.target.value);
    dispatch(fetchMovieSuggestions(e.target.value));
  };

  const onSubmitKeyword = (e) => {
    e.preventDefault();
    if (keyword !== movieList.lastKeyword) {
      dispatch(fetchMovieList({ keyword }));
    }
    dispatch(movieSuggestionsActions.resetSuggestions());
  };

  const onClickMovieSuggestion = (suggestion = {}) => {
    setKeyword(suggestion.Title);
    dispatch(fetchMovieList({ keyword: suggestion.Title }));
    dispatch(movieSuggestionsActions.resetSuggestions());
  };

  const onLastScrollMovieList = () => {
    dispatch(
      fetchMovieList({
        keyword: keyword,
        page: movieList.pagination.currentPage + 1,
        isNextList: true,
      })
    );
  };

  return {
    onChangeInputSearch,
    onSubmitKeyword,
    onClickMovieSuggestion,
    onLastScrollMovieList,
  };
};

export default useMovieList;
