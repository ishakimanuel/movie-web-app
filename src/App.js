import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Header from './common/components/header';
import store from './store.redux';
import PagesRoutes from './pages';
import './app.scss';

function App() {
  return (
    <BrowserRouter className="App">
      <Provider store={store}>
        <PagesRoutes />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
