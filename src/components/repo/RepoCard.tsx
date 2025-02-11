import GitHubIcon from '@mui/icons-material/GitHub';
import { IconButton, styled } from "@mui/material";
import { FC } from "react";

const Card = styled('div')(({ theme }) => ({
  overflowY: "auto",
  marginRight: "10px",
  marginBottom: "10px",
  wordBreak: "break-word",
  maxWidth: "250px",
  minHeight: "120px",
  maxHeight: "150px",
  border: "1px solid",
  display: "grid",
  gridTemplateRows: "1fr min-content",
  gridTemplateAreas: "'nameAndDescription'\n    'languageAndLink'",
  backgroundColor: theme.palette.background.default,
  '&:hover': {
    backgroundColor: theme.palette.background.paper
  }
}))

const NameAndDescription = styled('div')(({ theme }) => ({
  gridArea: 'nameAndDescription',
  color: theme.palette.text.header,
  backgroundColor: theme.palette.background.header,
}))

const Name = styled('p')({
  textAlign: 'center',
  fontSize: 'large',
  margin: 0,
  paddingLeft: '5px',
  paddingRight: '5px',
})

const Description = styled('p')({
  margin: 0,
  paddingLeft: '5px',
  paddingRight: '5px',
})

const LanguageAndLink = styled('div')({
  display: "grid",
  gridArea: "languageAndLink",
  gridTemplateAreas: "'language ghLink'",
  alignItems: "center",
  justifyItems: "center",
  borderTop: "1px solid"
})

const Language = styled('div')({
  gridArea: 'language'
})

const Link = styled('div')({
  gridArea: 'ghLink'
})

type RepoCardProps = { repo: any }

const RepoCard: FC<RepoCardProps> = ({ repo }) => {
  const handleOnClick = () => {
    window.open(repo.html_url, '_blank');
  }

  return (
    <Card key={repo.name}>
      <NameAndDescription>
        <Name>{repo.name}</Name>
        <Description>{repo.description}</Description>
      </NameAndDescription>
      <LanguageAndLink>
        <Language>{repo.language}</Language>
        <Link>
          <IconButton onClick={handleOnClick}>
            <GitHubIcon />
          </IconButton>
        </Link>
      </LanguageAndLink>
    </Card>
  )
}

export default RepoCard;
