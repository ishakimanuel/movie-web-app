import Router from 'common/components/router';
import MovieDetail from './movie-detail/movie-detail.page';
import Movies from './movies.page';

const routes = [
  { path: '/', component: Movies },
  { path: '/:id', component: MovieDetail },
];

const MoviesRoutes = () => <Router routes={routes} />;

export default MoviesRoutes;
