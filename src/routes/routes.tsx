import { Navigate } from "react-router-dom";
import App from '../App';
import About from '../components/About';
import ErrorPage from '../components/ErrorPage';
import Home from '../components/Home'
import Resume from '../components/Resume'

let routes = [
  {
    path: "/",
    element: <Navigate to="/portfolio" />  // Convenient redirect for localhost
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
]

export default routes;