import { Navigate } from "react-router-dom";
import App from '../App';
import About from '../components/About';
import ErrorPage from '../components/ErrorPage';
import Home from '../components/Home'
import Resume from '../components/resume/Resume'
import Visualizer from "../components/visualizer/Visualizer";

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
        element: <Home />,
        title: 'Home'
      },
      {
        path: "about",
        element: <About />,
        title: 'About'
      },
      {
        path: "resume",
        element: <Resume />,
        title: 'Resume'

      },
      {
        path: "visualizer",
        element: <Visualizer />,
        title: 'Visualizer'

      }
    ]
  }
]

export default routes;
