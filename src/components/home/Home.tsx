import { Typography } from "@mui/material";
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
      <Typography variant="h4">Check out some of my work!</Typography>
      {repoViewer}
    </div>
  )
}


export default Home;

