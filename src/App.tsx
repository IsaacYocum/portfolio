import React, { FC, useState } from 'react';
import { Box } from '@mui/system';
import Navbar from './components/navbar/Navbar';
import { Outlet } from "react-router-dom";
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

type AppProps = { content?: React.ReactNode }

let App: FC<AppProps> = () => {

  let [theme, setTheme] = useState<Theme>(Themes[0]);

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
        <Outlet />
      </div>
      <Footer />
    </ThemeProvider >
  );
}

export default App;
