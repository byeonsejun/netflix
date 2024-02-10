import { useEffect } from 'react';
import './App.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './component/Navigation';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { handlePopUp } from './util/util';

function App() {
  useEffect(() => {
    handlePopUp();
    return () => handlePopUp();
  }, []);
  return (
    <>
      <Provider store={store}>
        <Navigation />
        <Outlet />
      </Provider>
      <div id="portal" />
    </>
  );
}

export default App;
