import React, { FC, useMemo, useState } from 'react';
import { useQuery } from "react-query";
import RepoViewer from './components/repo/RepoViewer';
import { Outlet, useOutletContext } from "react-router-dom";
import './App.css';
import { CssBaseline } from '@mui/material';
import { Theme, ThemeProvider } from '@mui/material/styles';
import Themes from './Themes';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';

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

const fetchGitHubRepos = async () => {
  const res = await fetch("https://api.github.com/users/IsaacYocum/repos");
  const ghRepos: Array<any> = await res.json();
  return ghRepos.filter((repo: any) => REPO_NAMES_TO_DISPLAY.includes(repo.name));
};

type AppProps = { content?: React.ReactNode }

const App: FC<AppProps> = () => {
  const [theme, setTheme] = useState<Theme>(Themes[1]);
  const { data: ghRepos } = useQuery("ghRepos", fetchGitHubRepos);

  const repoViewer = useMemo(() => (
    <RepoViewer repos={ghRepos} />
  ), [ghRepos])

  let handleThemeChange = (theme: Theme) => {
    setTheme(theme);
  }

  return (
    <ThemeProvider theme={theme} >
      <CssBaseline />
      <Header onThemeChange={handleThemeChange} />
      <div id="content">
        <Outlet context={{ repoViewer }} />
      </div>
      <Footer repoViewer={repoViewer} />
    </ThemeProvider >
  );
}

export default App;
