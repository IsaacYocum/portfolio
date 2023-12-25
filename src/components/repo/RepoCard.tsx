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
      backgroundColor: theme.palette.background.header,
    },
    card: {
      backgroundColor: theme.palette.background.default,
    }
  }

  let handleOnClick = () => {
    window.open(repo.html_url, '_blank');
  }

  return (
    <div
      key={repo.name}
      className="repoCard"
      style={style.card}
    >
      <div className="nameAndDescription">
        <p style={style.cardTitle} className="cardTitle cardText">{repo.name}</p>
        <p className="cardText">{repo.description}</p>
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
