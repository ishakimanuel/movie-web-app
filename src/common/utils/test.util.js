import { configureStore } from '@reduxjs/toolkit';

const { render } = require('@testing-library/react');
const { Provider } = require('react-redux');
const { MemoryRouter } = require('react-router');
const { createStore } = require('redux');

export const renderWithRouterAndRedux = (
  reducer = {},
  initialEntries = [],
  initialState = {},
  components = []
) => {
  const store = configureStore({ reducer, preloadedState: initialState });
  const props = {};
  if (initialEntries.length) {
    props.initialEntries = initialEntries;
  }

  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  const renderComponents = (components) =>
    components.map((Component, i) => <Component key={i} />);

  return render(
    <MemoryRouter {...props}>
      {!!components.length && renderComponents(components)}
    </MemoryRouter>,
    { wrapper: Wrapper }
  );
};
