import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import routes from '../routes/routes';

let Navbar = () => {
  let [title, setTitle] = useState('Home')

  function createLinks() {
    return routes[1].children?.map(route => (
      <Button color="inherit" onClick={() => setTitle(route.title)}>
        <Link to={route.path}>{route.title}</Link>
      </Button>
    ));
  }

  return (
    <AppBar position="static" style={{ marginBottom: '10px' }}>
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
          {title}
        </Typography>
        {createLinks()}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;
