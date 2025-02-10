import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useRepoViewer } from "../../App";
import './Home.css'
import About from "../about/About";

const Home = () => {
  const { repoViewer } = useRepoViewer();

  return (
    <>
      <Typography variant="h2">Hello, I am Isaac Yocum</Typography>
      <Typography variant="h3">Welcome to my site! Please take a look around.</Typography>
      <br />
      <Typography variant="h3" sx={{color: 'teal'}}>{'$'} whoami?</Typography>
      <div className="outer-headings">
        <h1>
          <div className="inner-headings">
            <span>
              Full-Stack Developer <br />
              UI/UX Designer <br />
              Software Engineer <br />
              Perpetual Learner <br />
            </span>
          </div>
        </h1>
      </div>
      <About />
      <Typography variant="h3">Curiosity Indulged</Typography>
      <blockquote className="quote">
        "That looks cool, let me try"
        <figcaption>
          <cite>Isaac</cite>
        </figcaption>
      </blockquote>
      <Typography variant="h4">
        I use this site to conduct <Link to={'projects'}>Experiments</Link>.
      </Typography>
      <br />

      <Typography variant="h4">Check out some of my <Link to={'projects'}>GitHub Repos!</Link></Typography>
      <br />
      {repoViewer}
    </>
  )
}

export default Home;
