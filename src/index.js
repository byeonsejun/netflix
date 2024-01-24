import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorInfo from './component/ErrorInfo';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './pages/MovieDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorInfo />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/movies', element: <Movies /> },
      { path: '/movies/:id', element: <MovieDetail /> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
