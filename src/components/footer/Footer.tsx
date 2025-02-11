import { styled } from "@mui/material/styles";
import { Typography, Link as LinkBase } from '@mui/material';
import { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import { VISIBLE_LINKS } from "../../routes/routes";

const FooterParent = styled('footer')({
  display: 'flex',
  justifyContent: 'center',
  zIndex: 2,
  minHeight: '250px',
  marginLeft: '20px',
  marginRight: '20px',
  "@media screen and (max-width: 30em)": {
    "#footerProjects": { display: "none" }
  }
})

const FooterContent = styled('footer')({
  display: "flex",
  flexDirection: "row",
  maxWidth: "1280px",
  gap: "5em",
  paddingLeft: "20px",
  paddingRight: "20px"
})

const FooterColumn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
})

const FooterHeader = styled('p')({
  textTransform: 'uppercase',
  opacity: '80%'
})

const RepoListContainer = styled('div')({
  overflowY: "scroll", 
  maxHeight: "250px"
})

type FooterProps = { repoViewer?: React.ReactNode | null }

const Footer: FC<FooterProps> = ({ repoViewer }) => {
  const SiteLinks = useMemo(() => {
    return VISIBLE_LINKS.map(route => (
      <LinkBase
        key={route.title}
        to={route.path}
        component={Link}
      >
        <Typography>{route.title}</Typography>
      </LinkBase>
    ))
  }, [])

  const ContactLinks = useMemo(() => (
      <>
        <LinkBase href="mailto:isyocum@gmail.com">
          <Typography>Email</Typography>
        </LinkBase>
        <LinkBase href="https://github.com/IsaacYocum" target='_blank'>
          <Typography>GitHub</Typography>
        </LinkBase>
        <LinkBase href="https://www.linkedin.com/in/isaacyocum/" target='_blank'>
          <Typography>LinkedIn</Typography>
        </LinkBase>
      </>
  ), [])

  return (
    <FooterParent>
      <FooterContent>
        <FooterColumn>
          <FooterHeader>Site</FooterHeader>
          {SiteLinks}
        </FooterColumn>
        <FooterColumn>
          <FooterHeader>Contact</FooterHeader>
          {ContactLinks}
        </FooterColumn>
        <FooterColumn id="footerProjects">
          <FooterHeader>Projects</FooterHeader>
          <RepoListContainer>
            {repoViewer}
          </RepoListContainer>
        </FooterColumn>
      </FooterContent>
    </FooterParent>
  )
}

export default Footer;
