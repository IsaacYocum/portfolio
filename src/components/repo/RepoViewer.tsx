import { FC } from "react";
import RepoCard from "./RepoCard";
import { styled } from "@mui/material";

const RepoContent = styled('div')({
  display: "flex", 
  flexWrap: "wrap"
})

type RepoViewerProps = { repos?: Array<any> | null }

const RepoViewer: FC<RepoViewerProps> = ({ repos }) => {
  return (
    <RepoContent id="repoViewer">
      {repos?.map(repo => (
        <RepoCard key={repo.name} repo={repo} />
      ))}
    </RepoContent>
  )
}

export default RepoViewer;
