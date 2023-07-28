import React, { FC } from 'react';
import logo from './logo.svg';
import { Box } from '@mui/system';
import Navbar from './components/Navbar';
import { Outlet } from "react-router-dom"
import './App.css'

type AppProps = { content?: React.ReactNode }

let App: FC<AppProps> = ({ content }) => {
  return (
    <Box sx={{ flexGrow: 1, height: '100%' }} >
      <Navbar />
      <div id="content">
        <Outlet />
      </div>
    </Box >
  );
}

export default App;
