import { Navigate } from "react-router-dom";
import App from '../App';
import About from '../components/about/About';
import ErrorPage from '../components/ErrorPage';
import Home from '../components/home/Home'
import Projects from "../components/projects/Projects";
import Reader from "../components/projects/Reader";
import Resume from '../components/resume/Resume'
import Visualizer from "../components/visualizer/Visualizer";

const PROJECTS_PATH = 'projects'

export const VISIBLE_LINKS = [
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
    path: PROJECTS_PATH,
    element: <Projects />,
    title: 'Projects',
  },
]

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
      ...VISIBLE_LINKS,
      {
        path: `${PROJECTS_PATH}/visualizer`,
        element: <Visualizer />,
        title: 'Visualizer'
      },
      {
        path: `${PROJECTS_PATH}/reader`,
        element: <Reader />,
        title: 'tictactoe'
      },
      {
        path: `${PROJECTS_PATH}/tictactoe`,
        element: <Visualizer />,
        title: 'tictactoe'
      }

    ]
  }
]

export default routes;
