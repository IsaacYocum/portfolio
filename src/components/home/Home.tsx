import { Typography } from "@mui/material";
import './Home.css'

let Home = () => {
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
    </div>
  )
}


export default Home;

