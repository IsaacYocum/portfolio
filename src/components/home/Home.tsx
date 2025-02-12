import { Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { useRepoViewer } from '../../App';
import About from '../about/About';
import Introduction from '../introduction/Introduction';

const RepoViewerContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

const BlockQuote = styled('blockquote')({
  textAlign: 'right',
});

const Home = () => {
  const { repoViewer } = useRepoViewer();

  return (
    <>
      <Introduction />
      <About />
      <Typography variant="h3">Curiosity Indulged</Typography>
      <BlockQuote>
        "That looks cool, let me try"
        <figcaption>
          <cite>Isaac</cite>
        </figcaption>
      </BlockQuote>
      <Typography variant="h4">
        I use this site to conduct <Link to={'projects'}>Experiments</Link>.
      </Typography>
      <Typography variant="h4">
        Check out some of my <Link to={'projects'}>GitHub Repos!</Link>
      </Typography>
      <RepoViewerContainer>{repoViewer}</RepoViewerContainer>
    </>
  );
};

export default Home;
