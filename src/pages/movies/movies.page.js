import React from 'react';
import Header from 'common/components/header';
import { CardWithImage } from '../../common/components/card';
import { InputSearch } from '../../common/components/input/input';

const MoviesPage = () => {
  return (
    <div className="movies-page">
      <Header />
      <div className="content p-3">
        <h2 className="text-3xl font-light mt-7 mb-3">
          Find your movie here..
        </h2>
        <InputSearch className="w-50" />

        <div className="movie-list grid-cols-4 grid gap-4 pt-5 pb-5">
          <CardWithImage
            className="cursor-pointer"
            bgTitle="Card 1"
            bgUrl="https://upload.wikimedia.org/wikipedia/commons/e/ee/Sample_abc.jpg"
            onClickImage={() => null}
          >
            <h1>My Card</h1>
          </CardWithImage>
          <CardWithImage
            bgTitle="Card 1"
            bgUrl="https://upload.wikimedia.org/wikipedia/commons/e/ee/Sample_abc.jpg"
            onClickImage={() => null}
          >
            <h1>My Card</h1>
          </CardWithImage>
          <CardWithImage
            bgTitle="Card 1"
            bgUrl="https://upload.wikimedia.org/wikipedia/commons/e/ee/Sample_abc.jpg"
            onClickImage={() => null}
          >
            <h1>My Card</h1>
          </CardWithImage>
          <CardWithImage
            bgTitle="Card 1"
            bgUrl="https://upload.wikimedia.org/wikipedia/commons/e/ee/Sample_abc.jpg"
            onClickImage={() => null}
          >
            <h1>My Card</h1>
          </CardWithImage>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
