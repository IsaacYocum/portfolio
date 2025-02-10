import { Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useRepoViewer } from "../../App";
import './Home.css'
import About from "../about/About";

const styles = {
  code: {
    color: 'teal'
  }
}

const Home = () => {
  const { repoViewer } = useRepoViewer();

  return (
    <>
      <Typography variant="h2">Hello, I'm 
        <span style={styles.code}> Isaac</span>
      </Typography>
      <Typography variant="h3">Welcome to my site... Please take a look around.</Typography>
      <Divider variant="middle"/>
      <Typography variant="h4" >
        <span style={styles.code}>IsaacYocum@dev</span>
        <span>:~{'$'} pwd</span>
      </Typography>
      <Typography variant="h4">/home/myProtfolio</Typography>
      <Typography variant="h4" >
        <span style={styles.code}>IsaacYocum@dev</span>
        <span>:~{'$'} whoami</span>
      </Typography>
      <div className="outer-headings">
        <div className="inner-headings">
          <span>
            Full-Stack Developer <br />
            UI/UX Designer <br />
            Software Engineer <br />
            Perpetual Learner <br />
          </span>
        </div>
      </div>

      <Divider />
      <About />

      <Divider />
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

      <Divider />
      <br />
      <Typography variant="h4">Check out some of my <Link to={'projects'}>GitHub Repos!</Link></Typography>
      <br />
      {repoViewer}
    </>
  )
}

export default Home;
