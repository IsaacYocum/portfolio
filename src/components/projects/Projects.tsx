import { Link } from "react-router-dom";
import { useRepoViewer } from "../../App";

let Projects = () => {
  // let { repoViewer } = useRepoViewer();

  return (
    <div>
      <div>projects</div>
      {/* {repoViewer} */}
      <Link to={'visualizer'}>Data structure and Algorithmns Visualizer</Link>
      <br />
      <Link to={'Reader'}>Reader</Link>
    </div>
  )
}

export default Projects;
