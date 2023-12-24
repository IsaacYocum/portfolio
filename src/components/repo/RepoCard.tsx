import { IconButton, useTheme } from "@mui/material";
import { FC } from "react";
import './Repo.css'
import GitHubIcon from '@mui/icons-material/GitHub';

type RepoCardProps = { repo: any }

let RepoCard: FC<RepoCardProps> = ({ repo }) => {
  let theme = useTheme();

  let style = {
    cardTitle: {
      color: theme.palette.text.header,
      fontWeight: 'bold',
    }
  }

  let handleOnClick = () => {
    window.open(repo.html_url, '_blank');
  }

  return (
    <div key={repo.name} className="repoCard">
      <div className="nameAndDescription">
        <p style={style.cardTitle} className="cardTitle">{repo.name}</p>
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
  )
}

export default RepoCard;
