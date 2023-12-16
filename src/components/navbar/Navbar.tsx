import { useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, Divider, Drawer, IconButton, Link as LinkBase, Switch, Toolbar, Typography } from '@mui/material';
import { ChangeEvent, FC, ReactNode, useState } from 'react';
import { Link } from "react-router-dom";
import routes from '../../routes/routes';
import './Navbar.css';

interface AppProps {
  themeSelected: boolean,
  onThemeChange: (theme: boolean) => void;
}

let Navbar: FC<AppProps> = ({ themeSelected, onThemeChange }) => {
  let theme = useTheme()
  let [title, setTitle] = useState('Home')
  let [drawerOpen, setDrawerOpen] = useState(false)

  let clickLink = (title: string, fromDrawer: boolean) => {
    if (fromDrawer) setDrawerOpen(false);
    setTitle(title);
  }

  let toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  }

  let handleThemeClick = (event: ChangeEvent<HTMLInputElement>) => {
    onThemeChange(event.target.checked)
  }

  function createLinks(fromDrawer = false) {
    let linkSx: any = undefined;
    if (theme.palette.mode === 'light' && !fromDrawer) {
      linkSx = { color: theme.palette.primary.contrastText }
    }

    let links = routes[1].children?.map(route => (
      <Button
        key={route.path}
        onClick={() => clickLink(route.title, fromDrawer)}
      >
        <LinkBase
          to={route.path}
          component={Link}
        >
          <Typography {...linkSx}>{route.title}</Typography>
        </LinkBase>
      </Button >
    ));

    return links;
  }

  let createAppBar = (openDrawer: boolean, children?: ReactNode[]) => {
    return (
      <AppBar>
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleDrawer(openDrawer)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {children}
        </Toolbar>
      </AppBar>
    )
  }

  let drawer = (
    <Drawer
      open={drawerOpen}
      onClose={() => toggleDrawer(false)}
    >
      {createAppBar(false)}
      <div className='drawer'>
        {createLinks(true)}
        <div style={{ marginTop: 'auto', textAlign: 'center' }}>
          <Divider />
          <Typography>Theme</Typography>
          <div className='three-columns-grid'>
            <Typography>Light</Typography>
            <Switch checked={themeSelected} onChange={handleThemeClick} />
            <Typography>Dark</Typography>
          </div>
        </div>
      </div>
    </Drawer >
  )

  return (
    <div id="navbar">
      {drawer}
      {createAppBar(true, createLinks())}
    </div>
  )
}

export default Navbar;
