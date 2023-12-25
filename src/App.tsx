import React, { FC, useEffect, useMemo, useState } from 'react';
import Navbar from './components/navbar/Navbar';
import RepoViewer from './components/repo/RepoViewer';
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
  "TicTacToe",
  "lazyVimConfig"
];

type ContextType = { repoViewer: React.ReactNode | null }

export function useRepoViewer() {
  return useOutletContext<ContextType>();
}

type AppProps = { content?: React.ReactNode }

let App: FC<AppProps> = () => {
  let [theme, setTheme] = useState<Theme>(Themes[0]);
  let [repos, setRepos] = useState<any>([]);

  const repoViewer = useMemo(() =>
    <RepoViewer repos={repos} />,
    [repos]
  )

  useEffect(() => {
    async function fetchRepos() {
      let response = await fetch("https://api.github.com/users/IsaacYocum/repos");
      let ghRepos: Array<any> = await response.json();
      ghRepos = ghRepos.filter((repo: any) => REPO_NAMES_TO_DISPLAY.includes(repo.name));
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
        <Outlet context={{ repoViewer }} />
      </div>
      <Footer repoViewer={repoViewer} />
    </ThemeProvider >
  );
}

export default App;
