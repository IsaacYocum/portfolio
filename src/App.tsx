import React, { FC, useEffect, useState } from 'react';
import { Box } from '@mui/system';
import Navbar from './components/navbar/Navbar';
import { Outlet, useOutletContext } from "react-router-dom";
import './App.css';
import { CssBaseline } from '@mui/material';
import { Theme, ThemeProvider } from '@mui/material/styles';
import Themes from './Themes';
import Footer from './components/footer/Footer';

declare module '@mui/material/styles' {
  interface TypeText {
    header: string
  }
}

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

type ContextType = { repos: Array<any> | null }

export function useRepos() {
  return useOutletContext<ContextType>();
}

type AppProps = { content?: React.ReactNode }

let App: FC<AppProps> = () => {
  let [theme, setTheme] = useState<Theme>(Themes[0]);
  let [repos, setRepos] = useState<any>([]);

  useEffect(() => {
    async function fetchRepos() {
      let response = await fetch("https://api.github.com/users/IsaacYocum/repos");
      let ghRepos: Array<any> = await response.json();
      ghRepos = ghRepos.filter((repo: any) => REPO_NAMES_TO_DISPLAY.includes(repo.name));
      console.log(ghRepos)
      setRepos(ghRepos)
    }

    fetchRepos();
  }, [])

  let handleThemeChange = (theme: Theme) => {
    setTheme(theme);
  }

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Navbar
        themeSelected={theme}
        onThemeChange={handleThemeChange}
      />
      <div id="content">
        <Outlet context={{ repos }} />
      </div>
      <Footer projects={repos} />
    </ThemeProvider >
  );
}

export default App;
