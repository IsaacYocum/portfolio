import { MenuItem, Select, Theme, SelectChangeEvent, useTheme, InputLabel, FormControl, Icon, AppBar, Button, Divider, IconButton, Link as LinkBase, Toolbar, Typography, Drawer, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FC, ReactNode, useState } from 'react';
import { Link } from "react-router-dom";
import { VISIBLE_LINKS } from '../../routes/routes';
import './Header.css';
import Themes, { ThemeName } from '../../Themes';
import drawerIcon from '../../assets/drawer.svg'

const DrawerContents = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  paddingLeft: 20,
  paddingRight: 20,
  zIndex: 3
}))

interface AppProps {
  onThemeChange: (theme: Theme) => void;
}

const Header: FC<AppProps> = ({ onThemeChange }) => {
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

  let handleThemeChange = (event: SelectChangeEvent<string>) => {
    let theme = Themes.find(theme => theme.id === event.target.value);
    if (theme) onThemeChange(theme);
  }

  function createLinks(fromDrawer = false) {

    return VISIBLE_LINKS.map(route => (
      <Button
        key={route.path}
        onClick={() => clickLink(route.title, fromDrawer)}
      >
        <LinkBase
          to={route.path}
          component={Link}
        >
          <p >{route.title}</p>
        </LinkBase>
      </Button>
    ));
  }

  const memeDrawerIcon = (
    <Icon>
      <img src={drawerIcon} alt='Pixel Road' height={20} width={28} style={{ transform: drawerOpen ? 'scale(-1, -1)' : 'none' }} />
    </Icon>
  )

  const createAppBar = (openDrawer: boolean, children?: ReactNode[]) => {
    return (
      <AppBar position='static'>
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => toggleDrawer(openDrawer)}
          >
            {theme.id === ThemeName.Meme ? memeDrawerIcon : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <div id='appbarLinks'>
            {children}
          </div>
        </Toolbar>
      </AppBar>
    )
  }

  const drawer = (
    <Drawer
      open={drawerOpen}
      onClose={() => toggleDrawer(false)}
    >
      {createAppBar(false)}
      <DrawerContents>
        {createLinks(true)}
        <div style={{ marginTop: 'auto', textAlign: 'center', marginBottom: '10px' }}>
          <Divider />
          <FormControl fullWidth>
            <InputLabel id="themeSelector">Theme</InputLabel>
            <Select
              id='themeSelector'
              labelId='themeSelector'
              label='Theme'
              value={theme.id}
              onChange={handleThemeChange}
            >
              {Themes.map(theme => <MenuItem key={theme.id} value={theme.id}>{theme.id}</MenuItem>)}
            </Select>
          </FormControl>
        </div>
      </DrawerContents>
    </Drawer>
  )

  return (
    <>
      {drawer}
      {createAppBar(true, createLinks())}
    </>
  )
}

export default Header;
