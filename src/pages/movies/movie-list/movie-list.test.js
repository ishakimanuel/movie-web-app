import userEvent from '@testing-library/user-event';

const { renderWithRouterAndRedux } = require('common/utils/test.util');
const { movieListReducer } = require('./movie-list.redux');
const { default: MovieListPage } = require('./movie-list.page');
const { Route } = require('react-router-dom');
const { REQUEST_STATUS } = require('common/constants/request.constant');
const { screen, getByRole } = require('@testing-library/react');
const mockList = [
  {
    Title: 'Batman Begins',
    Year: '2005',
    imdbID: 'tt0372784',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
  },
  {
    Title: 'Batman v Superman: Dawn of Justice',
    Year: '2016',
    imdbID: 'tt2975590',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
  },
  {
    Title: 'Batman',
    Year: '1989',
    imdbID: 'tt0096895',
    Type: 'movie',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg',
  },
];

export function setupIntersectionObserverMock({
  root = null,
  rootMargin = '',
  thresholds = [],
  disconnect = () => null,
  observe = () => null,
  takeRecords = () => [],
  unobserve = () => null,
} = {}) {
  class MockIntersectionObserver {
    constructor() {
      this.root = root;
      this.rootMargin = rootMargin;
      this.thresholds = thresholds;
      this.disconnect = disconnect;
      this.observe = observe;
      this.takeRecords = takeRecords;
      this.unobserve = unobserve;
    }
  }

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });

  Object.defineProperty(global, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });
}

beforeEach(() => setupIntersectionObserverMock());

const renderMovieList = (initialState, routes) => {
  let testLocation;
  renderWithRouterAndRedux(movieListReducer, routes, initialState, [
    MovieListPage,
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

describe('Movie List', () => {
  test('should render error element when movie list empty', () => {
    renderMovieList({
      movieSuggestions: {
        list: [],
      },
      movieList: {
        pagination: {},
        list: [],
        error: 'My error',
        requestStatus: REQUEST_STATUS.failed,
      },
    });

    const error = screen.getByRole('heading', { name: 'error' });
    expect(error).toBeInTheDocument();
  });

  test('should render notfound element when movie list empty', () => {
    renderMovieList({
      movieSuggestions: {
        list: [],
      },
      movieList: {
        pagination: {},
        list: [],
        isNotFound: true,
        requestStatus: REQUEST_STATUS.succeeded,
      },
    });

    const notFoundElement = screen.getByRole('heading', { name: 'not-found' });
    expect(notFoundElement).toBeInTheDocument();
  });

  test('should Render movie list', () => {
    renderMovieList({
      movieSuggestions: {
        list: [],
      },
      movieList: {
        pagination: {},
        requestStatus: REQUEST_STATUS.succeeded,
        list: mockList,
      },
    });

    const finiteScroll = screen.getByRole('finite-scroll');
    const movieList = screen.getAllByRole('movie-card');

    expect(finiteScroll).toBeInTheDocument();
    expect(movieList).toHaveLength(mockList.length);
  });

  test('should show modal when click one of movie card', () => {
    renderMovieList({
      movieSuggestions: {
        list: [],
      },
      movieList: {
        pagination: {},
        requestStatus: REQUEST_STATUS.succeeded,
        list: mockList,
      },
    });

    const movieList = screen.getAllByRole('movie-card');
    const firstMovieCardImg = getByRole(movieList[0], 'card-image');

    userEvent.click(firstMovieCardImg);

    const movieModal = screen.getByRole('movie-modal');
    const modalImg = getByRole(movieModal, 'img', { name: 'modal-img' });
    expect(movieModal).toBeInTheDocument();
    expect(modalImg).toBeInTheDocument();
    expect(modalImg).toHaveAttribute('src', mockList[0].Poster);
  });
});
