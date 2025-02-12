import { Link as LinkBase, Typography, styled } from '@mui/material';
import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  GITHUB_PROFILE_URL,
  LINKEDIN_URL,
  MAILTO_EMAIL,
} from '../../constants';
import { VISIBLE_LINKS } from '../../routes/routes';

const FooterParent = styled('footer')({
  display: 'flex',
  justifyContent: 'center',
  zIndex: 2,
  minHeight: '250px',
  marginLeft: '20px',
  marginRight: '20px',
  '@media screen and (max-width: 30em)': {
    '#footerProjects': { display: 'none' },
  },
});

const FooterContent = styled('footer')({
  display: 'flex',
  flexDirection: 'row',
  maxWidth: '1280px',
  gap: '5em',
  paddingLeft: '20px',
  paddingRight: '20px',
});

const FooterColumn = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

const FooterHeader = styled('p')({
  textTransform: 'uppercase',
  opacity: '80%',
});

const RepoViewerContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  overflowY: 'scroll',
  maxHeight: '250px',
});

type FooterProps = { repoViewer?: React.ReactNode | null };

const Footer: FC<FooterProps> = ({ repoViewer }) => {
  const SiteLinks = useMemo(() => {
    return VISIBLE_LINKS.map((route) => (
      <LinkBase key={route.title} to={route.path} component={Link}>
        <Typography>{route.title}</Typography>
      </LinkBase>
    ));
  }, []);

  const ContactLinks = useMemo(
    () => (
      <>
        <LinkBase href={MAILTO_EMAIL}>
          <Typography>Email</Typography>
        </LinkBase>
        <LinkBase href={GITHUB_PROFILE_URL} target="_blank">
          <Typography>GitHub</Typography>
        </LinkBase>
        <LinkBase href={LINKEDIN_URL} target="_blank">
          <Typography>LinkedIn</Typography>
        </LinkBase>
      </>
    ),
    []
  );

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
          <RepoViewerContainer>{repoViewer}</RepoViewerContainer>
        </FooterColumn>
      </FooterContent>
    </FooterParent>
  );
};

export default Footer;
