import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
 Navigate 
} from "react-router-dom";
import About from './routes/About';
import ErrorPage from './routes/ErrorPage';
import Home from './routes/Home'
import Resume from './routes/Resume'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/portfolio" /> // convenient redirect for local development 
  },
  {
    path: "/portfolio", // needed for github pages
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/portfolio",
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "resume",
        element: <Resume />
      }
    ]
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
