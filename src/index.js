import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ErrorInfo from './component/ErrorInfo';
import Home from './pages/Home';

const Movies = lazy(() => import('./pages/Movies'));
const MovieDetail = lazy(() => import('./pages/MovieDetail'));

const PageFallback = () => null;

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorInfo />,
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: '/movies', element: <Suspense fallback={<PageFallback />}><Movies /></Suspense> },
      { path: '/movies/:id', element: <Suspense fallback={<PageFallback />}><MovieDetail /></Suspense> },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
