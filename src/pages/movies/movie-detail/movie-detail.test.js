const { screen, waitFor } = require('@testing-library/react');
const { Route } = require('react-router-dom');
const { default: MovieDetailPage } = require('./movie-detail.page');
const { movieDetailReducer } = require('./movie-detail.redux');
const { REQUEST_STATUS } = require('common/constants/request.constant');
const { renderWithRouterAndRedux } = require('common/utils/test.util');

const renderMovieDetail = (routes, initialState) => {
  let testLocation;
  renderWithRouterAndRedux(movieDetailReducer, routes, initialState, [
    MovieDetailPage,
    () => (
      <Route
        render={({ location }) => {
          testLocation = location;
          return null;
        }}
      />
    ),
  ]);
  return { testLocation };
};

describe('Movie detail page', () => {
  test('should render movie detail with right url', () => {
    const routes = ['/movies/movieId'];

    const { testLocation } = renderMovieDetail(routes, {
      movieDetail: { detail: {} },
    });

    expect(testLocation.pathname).toBe(routes[0]);
  });

  test('should render loading indicator', () => {
    renderMovieDetail([], {
      movieDetail: {
        requestStatus: REQUEST_STATUS.pending,
      },
    });

    const loadingIndicator = screen.getByRole('spinner');

    expect(loadingIndicator).toBeInTheDocument();
  });

  test('should not render loading indicator', async () => {
    renderMovieDetail([], {
      movieDetail: {
        requestStatus: REQUEST_STATUS.succeeded,
        detail: {},
      },
    });

    await waitFor(() => {
      expect(screen.queryByRole('spinner')).not.toBeInTheDocument();
    });
  });

  test('Should render right movie detail information', () => {
    const mock = {
      Poster: 'https://myimg.png',
      Title: 'Saras 007',
      imdbRating: '8',
      Runtime: '180min',
      Released: '2001/10/12',
      Country: 'Indonesia',
      Actors: 'Saras Sulistiawaty',
      Director: 'N/A',
      Production: 'Indosiar',
      Writer: 'N/A',
      Plot: 'lorem lorem lorem',
    };
    renderMovieDetail([], {
      movieDetail: {
        requestStatus: REQUEST_STATUS.succeeded,
        detail: mock,
      },
    });

    const poster = screen.getByTitle('Poster');
    const title = screen.getByRole('heading', { level: 2 });
    const titleDesc = screen.getByRole('heading', {
      level: 3,
      name: `IMDB ${mock.imdbRating} | ${mock.Runtime} | ${mock.Released} | ${mock.Country}`,
    });
    const actors = screen.getByRole('heading', {
      level: 5,
      name: `Actors: ${mock.Actors}`,
    });
    const director = screen.getByRole('heading', {
      level: 5,
      name: `Director: ${mock.Director}`,
    });
    const production = screen.getByRole('heading', {
      level: 5,
      name: `Production: ${mock.Production}`,
    });
    const writer = screen.getByRole('heading', {
      level: 5,
      name: `Writer: ${mock.Writer}`,
    });
    const plot = screen.getByRole('article');

    expect(poster).toHaveStyle(`background-image: url(${mock.Poster})`);
    expect(title).toHaveTextContent(mock.Title);
    expect(titleDesc).toBeInTheDocument();
    expect(actors).toBeInTheDocument();
    expect(director).toBeInTheDocument();
    expect(production).toBeInTheDocument();
    expect(writer).toBeInTheDocument();
    expect(plot).toHaveTextContent(mock.Plot);
  });
});
