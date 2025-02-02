import { Link } from "react-router-dom";

let Projects = () => {
  return (
    <div>
      <h2>Projects</h2>
      <p>Check out these random project ideas I've mad when the inspriation hits!</p>
      <Link to={'visualizer'}>Data structures and Algorithms Visualizer</Link>
      <br />
      <Link to={'Reader'}>Reader</Link>
      <br />
      <Link to={'soundGenerator'}>Sound Generator</Link>
      <br />
      <Link to={'pomodoro'}>Pomodoro</Link>
    </div>
  )
}

export default Projects;
