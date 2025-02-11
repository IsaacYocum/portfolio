import { CssBaseline } from '@mui/material';
import { styled, Theme, ThemeProvider } from '@mui/material/styles';
import React, { FC, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { Outlet, useOutletContext } from 'react-router-dom';
import Themes from './Themes';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import RepoViewer from './components/repo/RepoViewer';
import { GITHUB_REPOS_URL, REPO_NAMES_TO_DISPLAY } from './constants';

const Content = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '1280px',
  margin: '2em',
  gap: '15px',
});

type ContextType = { repoViewer: React.ReactNode | null };

export function useRepoViewer() {
  return useOutletContext<ContextType>();
}

const fetchGitHubRepos = async () => {
  const res = await fetch(GITHUB_REPOS_URL);
  const ghRepos: Array<any> = await res.json();
  return ghRepos.filter((repo: any) =>
    REPO_NAMES_TO_DISPLAY.includes(repo.name)
  );
};

type AppProps = { content?: React.ReactNode };

const App: FC<AppProps> = () => {
  const [theme, setTheme] = useState<Theme>(Themes[1]);
  const { data: ghRepos } = useQuery('ghRepos', fetchGitHubRepos);

  const repoViewer = useMemo(() => <RepoViewer repos={ghRepos} />, [ghRepos]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header onThemeChange={(theme) => setTheme(theme)} />
      <Content id="content">
        <Outlet context={{ repoViewer }} />
      </Content>
      <Footer repoViewer={repoViewer} />
    </ThemeProvider>
  );
};

export default App;
