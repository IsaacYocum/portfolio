import { useRepoViewer } from "../../App";

let Projects = () => {
  let { repoViewer } = useRepoViewer();

  return (
    <div>
      <div>projects</div>
      {repoViewer}
    </div>
  )
}

export default Projects;
