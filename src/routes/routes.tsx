import { Navigate } from "react-router-dom";
import App from '../App';
import About from '../components/about/About';
import ErrorPage from '../components/ErrorPage';
import Home from '../components/home/Home'
import Projects from "../components/projects/Projects";
import Reader from "../components/projects/reader/Reader";
import SoundGenerator from "../components/projects/soundGenerator/SoundGenerator";
import Resume from '../components/resume/Resume'
import Visualizer from "../components/visualizer/Visualizer";
import Pomodoro from "../components/projects/pomodoro/pomodoro";
import Fetching from "../components/projects/fetching/fetching";

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
        title: 'reader'
      },
      {
        path: `${PROJECTS_PATH}/soundGenerator`,
        element: <SoundGenerator />,
        title: 'SoundGenerator'
      },
      // {
      //   path: `${PROJECTS_PATH}/tictactoe`,
      //   element: <Visualizer />,
      //   title: 'tictactoe'
      // },
      {
        path: `${PROJECTS_PATH}/pomodoro`,
        element: <Pomodoro />,
        title: 'pomodoro'
      },
      {
        path: `${PROJECTS_PATH}/fetching`,
        element: <Fetching />,
        title: 'fetching'
      }
    ]
  }
]

export default routes;
