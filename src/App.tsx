import React, { FC } from 'react';
import logo from './logo.svg';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet, Link } from "react-router-dom"
import './App.css'

type AppProps = { content?: React.ReactNode }

let App: FC<AppProps> = ({ content }) => {
  return (
    <Box sx={{ flexGrow: 1, height: '100%' }} >
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">
            <Link to={"home"}>Home</Link>
          </Button>
          <Button color="inherit">
            <Link to={"about"}>About</Link>
          </Button>
          <Button color="inherit">
            <Link to={"resume"}>Resume</Link>
          </Button>
        </Toolbar>
      </AppBar>
      <div id="content">
        <Outlet />
      </div>
    </Box >
  );
}

export default App;
