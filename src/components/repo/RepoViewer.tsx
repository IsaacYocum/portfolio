import { FC } from "react";
import RepoCard from "./RepoCard";
import './Repo.css'

type RepoViewerProps = { repos?: Array<any> | null }

let RepoViewer: FC<RepoViewerProps> = ({ repos }) => {
  return (
    <div id="repoViewer">
      <div className="flexFiller">
        {repos?.map(repo => (
          <RepoCard key={repo.name} repo={repo} />
        ))}
      </div>
    </div>
  )
}

export default RepoViewer;
