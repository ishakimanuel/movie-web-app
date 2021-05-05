import React, { useEffect, useState } from 'react';
import { Card } from '../../../common/components/card';
import { InputSearch } from '../../../common/components/input';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieList } from 'pages/movies/movie-list/movie-list.redux';
import Spinner from 'common/components/spinner/spinner';

const MovieList = () => {
  const [keyword, setKeyword] = useState('batman');
  const dispatch = useDispatch();
  const movieList = useSelector((state) => state.movieList);

  useEffect(() => {
    dispatch(fetchMovieList(keyword));
  }, []);

  return (
    <div className="movies-page">
      <div className="content">
        <h2 className="text-3xl font-light mt-5 mb-3">
          Find your movie here..
        </h2>
        <InputSearch
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-50"
        />
        <div className="movie-list grid-cols-5 grid gap-6 pt-5 pb-5">
          {movieList.list.map((item) => (
            <Card
              key={item.imdbID}
              className="cursor-pointer"
              bgUrl={item.Poster}
              url={`/movies/${item.imdbID}`}
            >
              <h1 className="text-2xl ff-heading text-primary">{item.Title}</h1>
              <p>
                <span className="font-bold">Type:</span> {item.Type}
              </p>
              <p>
                <span className="font-bold">Year:</span> {item.Year}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
