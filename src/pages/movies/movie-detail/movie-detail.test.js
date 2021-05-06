const { render, screen, waitFor } = require('@testing-library/react');
const { MemoryRouter } = require('react-router');
const { default: MovieDetailPage } = require('./movie-detail.page');
const { Provider } = require('react-redux');
const { createStore } = require('redux');
const { movieDetailReducer } = require('./movie-detail.redux');

function renderMovieDetailWithRouter(initialEntries = [], initialState = {}) {
  const store = createStore(movieDetailReducer, initialState);
  const props = {};
  if (initialEntries.length) {
    props.initialEntries = initialEntries;
  }

  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(
    <MemoryRouter>
      <MovieDetailPage />
    </MemoryRouter>,
    { wrapper: Wrapper }
  );
}

describe('Movie detail page', () => {
  test('should render loading indicator', () => {
    renderMovieDetailWithRouter([], {
      movieDetail: {
        requestStatus: 1,
      },
    });
    const loadingIndicator = screen.getByRole('spinner');

    expect(loadingIndicator).toBeInTheDocument();
  });

  test('should not render loading indicator', async () => {
    renderMovieDetailWithRouter([], {
      movieDetail: {
        requestStatus: 2,
        detail: {},
      },
    });

    await waitFor(() => {
      expect(screen.queryByRole('spinner')).not.toBeInTheDocument();
    });
  });
});
