import React, { useEffect, useState } from 'react';
import { Card } from '../../../common/components/card';
import { InputSearch } from '../../../common/components/input';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieList } from 'pages/movies/movie-list/movie-list.redux';
import Modal from 'common/components/modal/modal';
import useModal from 'common/hooks/use-modal';
import { REQUEST_STATUS } from 'common/constants/request.constant';
import Spinner from 'common/components/spinner/spinner';

const MovieList = () => {
  const movieList = useSelector((state) => state.movieList);

  const [keyword, setKeyword] = useState(movieList.lastKeyword);
  const dispatch = useDispatch();
  const { openModal, isOpen, closeModal, state: modalState } = useModal();

  useEffect(() => {
    dispatch(fetchMovieList(keyword));
  }, []);

  const onSubmitKeyword = (e) => {
    e.preventDefault();
    if (keyword !== movieList.lastKeyword) {
      dispatch(fetchMovieList(keyword));
    }
  };

  const shouldNotRenderMovieList =
    movieList.requestStatus === REQUEST_STATUS.idle ||
    movieList.requestStatus === REQUEST_STATUS.pending;

  const renderMovieList = () => {
    if (shouldNotRenderMovieList) {
      return <Spinner />;
    }

    if (movieList.isNotFound)
      return (
        <h2 className="mt-3">
          Result for{' '}
          <span className="text-primary underline">
            {movieList.lastKeyword}
          </span>{' '}
          is not found
        </h2>
      );
    return (
      <div className="movie-list grid-cols-5 grid gap-6 pt-5 pb-5">
        {movieList.list.map((item) => (
          <Card
            key={item.imdbID}
            className="cursor-pointer"
            bgUrl={item.Poster}
            url={`/movies/${item.imdbID}`}
            onClickImg={() =>
              openModal({ imgUrl: item.Poster, title: item.Title })
            }
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
    );
  };

  return (
    <div className="movies-page">
      <Modal
        open={isOpen}
        closeModal={() => closeModal({ imgUrl: null, title: null })}
      >
        <img src={modalState.imgUrl} alt={modalState.title} />
      </Modal>
      <div className="content">
        <h2 className="text-3xl font-light mt-5 mb-3">
          Find your movie here..
        </h2>
        <InputSearch
          onSubmit={onSubmitKeyword}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-50"
        />
        {renderMovieList()}
      </div>
    </div>
  );
};

export default MovieList;
