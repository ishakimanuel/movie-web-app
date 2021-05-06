import Spinner from 'common/components/spinner/spinner';
import { REQUEST_STATUS } from 'common/constants/request.constant';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchMovieDetail } from './movie-detail.redux';

const MovieDetailPage = () => {
  const dispatch = useDispatch();
  const { detail, requestStatus } = useSelector((state) => state.movieDetail);
  const { movieId } = useParams();

  useEffect(() => {
    if (detail?.imdbID !== movieId) {
      dispatch(fetchMovieDetail(movieId));
    }
  }, []);

  if (
    requestStatus === REQUEST_STATUS.pending ||
    requestStatus === REQUEST_STATUS.idle
  ) {
    return <Spinner />;
  }

  return (
    <div
      className="movie-detail grid grid-cols-3 grid-rows-1"
      style={{ minHeight: '78vh' }}
    >
      <div
        title="Poster"
        className="poster bg-size bg-cover bg-center"
        style={{ backgroundImage: `url(${detail.Poster})` }}
      />

      <div className="detail p-5 col-span-2 bg-dark text-secondary grid">
        <h2 className="font-4 text-6xl ff-heading">{detail.Title}</h2>

        <div className="heading">
          <h3>
            <span>
              IMDB
              <span className="text-primary"> {detail.imdbRating}</span> |
            </span>
            <span> {detail.Runtime}</span> | <span> {detail.Released}</span> |{' '}
            <span> {detail.Country}</span>
          </h3>
          <h5>
            Actors: <span className="text-primary">{detail.Actors}</span>
          </h5>
          <h5>
            Director: <span className="text-primary">{detail.Director}</span>
          </h5>
          <h5>
            Production:{' '}
            <span className="text-primary">{detail.Production}</span>
          </h5>
          <h5>
            Writer:{' '}
            <span className="text-primary text-sm"> {detail.Writer}</span>
          </h5>
        </div>

        <article className="plot">
          <p className="font-thin text-3xl mt-3 leading-10">{detail.Plot}</p>
        </article>
      </div>
    </div>
  );
};

export default MovieDetailPage;
