import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginPage from './Pages/LoginPage';
import TestPage from './Pages/main';
import RegisterPage from './Pages/RegPage';
import EditPage from './Pages/EditPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/ava',
    element: <TestPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/edit',
    element: <EditPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
