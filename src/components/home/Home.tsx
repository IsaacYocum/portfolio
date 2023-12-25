import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useRepoViewer } from "../../App";
import './Home.css'

let Home = () => {
  let { repoViewer } = useRepoViewer();

  return (
    <div>
      <Typography variant="h1">Curiosity Indulged</Typography>
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
      <blockquote className="quote">
        "That looks cool, let me try"
        <figcaption>
          <cite>Isaac</cite>
        </figcaption>
      </blockquote>
      <div>
        TODO
        <ul>Showcase skills</ul>
        <ul>Call to action</ul>
      </div>
      <Typography variant="h4">
        Check out some of my&nbsp;
        <Link to={'projects'}>Projects</Link>
        !
      </Typography>
      <br />

      <Typography variant="h4">Check out some of my GitHub Repos!</Typography>
      {repoViewer}
    </div>
  )
}


export default Home;

