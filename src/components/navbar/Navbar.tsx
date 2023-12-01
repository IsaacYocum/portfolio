import { AppBar, Button, Drawer, IconButton, Toolbar, Typography, Link as LinkBase, useTheme } from '@mui/material';
import { Link } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import routes from '../../routes/routes';
import './Navbar.css'

let Navbar = () => {
  const theme = useTheme()
  let [title, setTitle] = useState('Home')
  let [drawerOpen, setDrawerOpen] = useState(false)

  let clickLink = (title: string, fromDrawer: boolean) => {
    if (fromDrawer) setDrawerOpen(false);
    setTitle(title);
  }

  let toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  }

  function createLinks(fromDrawer = false) {
    return routes[1].children?.map(route => (
      <Button
        key={route.path}
        color='secondary'
        onClick={() => clickLink(route.title, fromDrawer)}
      >
        <LinkBase
          to={route.path}
          component={Link}
        >
          {route.title}
        </LinkBase>
      </Button>
    ));
  }

  let drawer = (
    <Drawer
      open={drawerOpen}
      onClose={() => toggleDrawer(false)}
    >
      <AppBar position="static" style={{ marginBottom: '10px' }}>
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleDrawer(false)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className='drawer'>
        {createLinks(true)}
      </div>
    </Drawer >
  )

  return (
    <AppBar position="static" style={{ marginBottom: '10px' }}>
      {drawer}
      <Toolbar variant="dense">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => toggleDrawer(true)}
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
