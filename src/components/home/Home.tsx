import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useRepoViewer } from "../../App";
import About from "../about/About";
import Introduction from "../introduction/Introduction";

const BlockQuote = styled('blockquote')({
  textAlign: "right"
})

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
      <Typography variant="h4">Check out some of my <Link to={'projects'}>GitHub Repos!</Link></Typography>
      {repoViewer}
    </>
  )
}

export default Home;
