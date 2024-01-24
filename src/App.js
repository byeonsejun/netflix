import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './component/Navigation';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <Outlet />
    </Provider>
  );
}

export default App;
