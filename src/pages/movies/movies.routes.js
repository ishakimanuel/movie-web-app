import Header from 'common/components/header';
import Router from 'common/components/router';
import MovieDetail from './movie-detail/movie-detail.page';
import MovieList from './movie-list/movie-list.page';

const routes = [
  { path: '/', component: MovieList },
  { path: '/:movieId', component: MovieDetail },
];

const MoviesRoutes = () => {
  return (
    <div>
      <Header />
      <div className="p-5">
        <Router routes={routes} />
      </div>
    </div>
  );
};

export default MoviesRoutes;
