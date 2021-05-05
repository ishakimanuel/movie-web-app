const { render, screen } = require('@testing-library/react');
const { MemoryRouter } = require('react-router-dom');
const { default: HomePage } = require('./home.page');

function renderHomePageWithRouter() {
  return render(<HomePage />, { wrapper: MemoryRouter });
}

describe('Home Page', () => {
  test('Should render consistent homepage UI', () => {
    const homepage = renderHomePageWithRouter();

    const homepageJson = homepage.asFragment();
    expect(homepageJson).toMatchSnapshot();
  });

  test('should render Logo', () => {
    renderHomePageWithRouter();
    const logoContainer = screen.getByRole('heading', { level: 1 });
    const movieText = screen.getByText(/movie/i);
    const appText = screen.getByText(/app/i);
    expect(logoContainer).toBeInTheDocument();
    expect(movieText).toBeInTheDocument();
    expect(appText).toBeInTheDocument();
  });

  test('should render exlore button', () => {
    renderHomePageWithRouter();
    const buttonExplore = screen.getByRole('link', {
      name: /explore-button/i,
    });
    expect(buttonExplore).toBeInTheDocument();
    expect(buttonExplore).toHaveTextContent('Explore Now');
  });
});
