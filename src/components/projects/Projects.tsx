import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

let Projects = () => {
  return (
    <>
      <Typography variant="h2">Projects</Typography>
      <p>Check out these project ideas I've made when the inspriation hits!</p>
      <Link to={'visualizer'}>Data structures and Algorithms Visualizer</Link>
      <br />
      <Link to={'Reader'}>Reader</Link>
      <br />
      <Link to={'soundGenerator'}>Sound Generator</Link>
      <br />
      <Link to={'pomodoro'}>Pomodoro</Link>
      <br />
      <Link to={'fetching'}>Fetching</Link>
    </>
  )
}

export default Projects;
