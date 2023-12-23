import { Typography } from "@mui/material";
import { useRepos } from "../../App";
import './Home.css'

let Home = () => {
  let { repos } = useRepos();

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
      <div>
        {repos?.map((repo: any) => (
          <ul key={repo.name}>
            <a href={repo.html_url} target='_blank'>{repo.name}</a>
          </ul>
        ))}
      </div>
    </div>
  )
}


export default Home;

