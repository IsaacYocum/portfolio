import { MenuItem, Select, Theme, SelectChangeEvent, useTheme, InputLabel, FormControl, SvgIcon, Icon, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, Divider, Drawer, IconButton, Link as LinkBase, Toolbar, Typography } from '@mui/material';
import { FC, ReactNode, useMemo, useState } from 'react';
import { Link } from "react-router-dom";
import { VISIBLE_LINKS } from '../../routes/routes';
import './Header.css';
import Themes, { ThemeName } from '../../Themes';
import drawerIcon from '../../assets/drawer.svg'
import { lightBlue } from '@mui/material/colors';

interface AppProps {
  onThemeChange: (theme: Theme) => void;
}

const Header: FC<AppProps> = ({ onThemeChange }) => {
  let theme = useTheme()
  let styles = useMemo(() => ({
    drawer: {
      backgroundColor: theme.palette.background.default,
      // color: theme.palette.text.header,
      display: 'flex',
      flexDirection: 'column' as 'column',
      flexGrow: 1,
      paddingLeft: 20,
      paddingRight: 20,
      zIndex: 3
    },
    threeColumnGrid: {
      display: 'grid',
      gridAutoRows: '1fr',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center'
    }
  }), [theme])

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
    let linkSx: any = undefined;
    if (theme.palette.mode === 'light' && !fromDrawer) {
      linkSx = { color: theme.palette.primary.contrastText }
    }
      // linkSx = { color: lightBlue[100] }

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
      <img src={drawerIcon} height={20} width={28} style={{ transform: drawerOpen ? 'scale(-1, -1)' : 'none' }} />
    </Icon>
  )

  let createAppBar = (openDrawer: boolean, children?: ReactNode[]) => {
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

  let drawer = (
    <Drawer
      open={drawerOpen}
      onClose={() => toggleDrawer(false)}
    >
      {createAppBar(false)}
      <div style={styles.drawer}>
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
      </div>
    </Drawer >
  )

  return (
    <>
      {drawer}
      {createAppBar(true, createLinks())}
    </>
  )
}

export default Header;
