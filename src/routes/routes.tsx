import { Navigate } from "react-router-dom";
import App from '../App';
import About from '../components/about/About';
import ErrorPage from '../components/ErrorPage';
import Home from '../components/home/Home';
import Fetching from "../components/projects/fetching/fetching";
import Pomodoro from "../components/projects/pomodoro/pomodoro";
import Experiments from "../components/projects/Experiments";
import Reader from "../components/projects/reader/Reader";
import SoundGenerator from "../components/projects/soundGenerator/SoundGenerator";
import Resume from '../components/resume/Resume';
import Visualizer from "../components/visualizer/Visualizer";

const EXPERIMENTS_PATH = 'experiments'

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
    path: EXPERIMENTS_PATH,
    element: <Experiments />,
    title: 'Experiments',
  },
]

const routes = [
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
        path: `${EXPERIMENTS_PATH}/visualizer`,
        element: <Visualizer />,
        title: 'Visualizer'
      },
      {
        path: `${EXPERIMENTS_PATH}/reader`,
        element: <Reader />,
        title: 'reader'
      },
      {
        path: `${EXPERIMENTS_PATH}/soundGenerator`,
        element: <SoundGenerator />,
        title: 'SoundGenerator'
      },
      // {
      //   path: `${PROJECTS_PATH}/tictactoe`,
      //   element: <Visualizer />,
      //   title: 'tictactoe'
      // },
      {
        path: `${EXPERIMENTS_PATH}/pomodoro`,
        element: <Pomodoro />,
        title: 'pomodoro'
      },
      {
        path: `${EXPERIMENTS_PATH}/fetching`,
        element: <Fetching />,
        title: 'fetching'
      }
    ]
  }
]

export default routes;
