import { Divider, IconButton, Typography } from "@mui/material";
import { FC } from "react";
import './Repo.css'
import GitHubIcon from '@mui/icons-material/GitHub';

type RepoCardProps = { repo: any }


let RepoCard: FC<RepoCardProps> = ({ repo }) => {
  let handleOnClick = () => {
    window.open(repo.html_url, '_blank');
  }

  return (
    <div key={repo.name} className="repoCard">
      <div className="cardContents">
        <div className="nameAndDescription">
          <p className="cardTitle">{repo.name}</p>
          {repo.description}
        </div>
        <div className="lanugageAndLink">
          <div className="lanugage">
            {repo.language}
          </div>
          <div className="ghLink">
            <IconButton
              onClick={handleOnClick}
            >
              <GitHubIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RepoCard;
