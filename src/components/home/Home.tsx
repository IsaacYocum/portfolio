import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import './Home.css'

let Home = () => {
  let [repos, setRepos] = useState<any>([]);

  const REPO_NAMES_TO_DISPLAY = [
    "portfolio",
    "learn-lang-frontend",
    "learn-lang-backend",
    "VietnameseWords",
    "VietnameseWordsAndroid",
    "Pong",
    "Snake",
    "TicTacToe",
    "lazyVimConfig"
  ];

  useEffect(() => {
    async function fetchRepos() {
      let response = await fetch("https://api.github.com/users/IsaacYocum/repos");
      response = await response.json();
      console.log(response)
      setRepos(response)
    }

    fetchRepos();
  }, [])

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
        {repos.map((repo: any) => {
          console.log(repo.name)
          if (REPO_NAMES_TO_DISPLAY.includes(repo.name)) {
            return (<ul><a href={repo.html_url} target='_blank'>{repo.name}</a></ul>)
          }
        })}
      </div>
    </div>
  )
}


export default Home;

