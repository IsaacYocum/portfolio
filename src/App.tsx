import React, { FC, useState } from 'react';
import logo from './logo.svg';
import { Box } from '@mui/system';
import Navbar from './components/navbar/Navbar';
import { Outlet } from "react-router-dom"
import './App.css'
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type AppProps = { content?: React.ReactNode }

let App: FC<AppProps> = () => {

  let [themeState, setThemeState] = useState(false);

  const defaultTheme = createTheme({
    typography: {
      fontFamily: [
        'sans-serif',
      ].join(','),
    },
    palette: {
      mode: !themeState ? 'light' : 'dark'
    }
  })

  let handleThemeChange = (theme: boolean) => {
    setThemeState(theme);
  }

  return (
    <ThemeProvider theme={defaultTheme} >
      <CssBaseline />
      <Box sx={{ flexGrow: 1, height: '100%' }} >
        <Navbar
          themeSelected={themeState}
          onThemeChange={handleThemeChange}
        />
        <div id="content">
          <Outlet />
        </div>
      </Box >
    </ThemeProvider >
  );
}

export default App;
