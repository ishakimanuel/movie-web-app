import Router from '../common/components/router';
import HomePage from './home/home.page';
import MoviesPage from './movies';

const routes = [
  { path: '/', component: HomePage },
  { path: '/movies', component: MoviesPage, exact: false },
];

const PagesRoutes = () => <Router routes={routes} />;

export default PagesRoutes;
