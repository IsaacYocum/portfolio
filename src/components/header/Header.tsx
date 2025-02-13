import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Button,
  Divider,
  Drawer,
  FormControl,
  Icon,
  IconButton,
  InputLabel,
  Link as LinkBase,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  Theme,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { FC, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import Themes, { ThemeName } from '../../Themes';
import drawerIcon from '../../assets/drawer.svg';
import { VISIBLE_LINKS } from '../../routes/routes';

const DrawerContainer = styled('div')({
  '@media screen and (max-width: 30em)': {
    '#appbarLinks': { display: 'none' },
  },
});

const DrawerContents = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  paddingLeft: 20,
  paddingRight: 20,
  zIndex: 3,
}));

const ThemeSelectorContainer = styled('div')({
  marginTop: 'auto',
  textAlign: 'center',
  marginBottom: '10px',
});

interface AppProps {
  onThemeChange: (theme: Theme) => void;
}

const Header: FC<AppProps> = ({ onThemeChange }) => {
  const theme = useTheme();

  const [title, setTitle] = useState('Home');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const clickLink = (title: string, fromDrawer: boolean) => {
    if (fromDrawer) setDrawerOpen(false);
    setTitle(title);
  };

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const handleThemeChange = (event: SelectChangeEvent<string>) => {
    const theme = Themes.find((theme) => theme.id === event.target.value);
    if (theme) onThemeChange(theme);
  };

  function createLinks(fromDrawer = false) {
    return VISIBLE_LINKS.map((route) => (
      <Button
        key={route.path}
        onClick={() => clickLink(route.title, fromDrawer)}
      >
        <LinkBase to={route.path} component={Link}>
          {route.title}
        </LinkBase>
      </Button>
    ));
  }

  const memeDrawerIcon = (
    <Icon>
      <img
        src={drawerIcon}
        alt="Pixel Road"
        height={20}
        width={28}
        style={{ transform: drawerOpen ? 'scale(-1, -1)' : 'none' }}
      />
    </Icon>
  );

  const createAppBar = (openDrawer: boolean, children?: ReactNode[]) => {
    return (
      <AppBar position={openDrawer ? 'fixed' : 'static'}>
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            onClick={() => toggleDrawer(openDrawer)}
          >
            {theme.id === ThemeName.Meme ? memeDrawerIcon : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <div id="appbarLinks">{children}</div>
        </Toolbar>
      </AppBar>
    );
  };

  const drawer = (
    <Drawer open={drawerOpen} onClose={() => toggleDrawer(false)}>
      {createAppBar(false)}
      <DrawerContents>
        {createLinks(true)}
        <ThemeSelectorContainer>
          <Divider />
          <FormControl fullWidth>
            <InputLabel id="themeSelector">Theme</InputLabel>
            <Select
              id="themeSelector"
              labelId="themeSelector"
              label="Theme"
              value={theme.id}
              onChange={handleThemeChange}
            >
              {Themes.map((theme) => (
                <MenuItem key={theme.id} value={theme.id}>
                  {theme.id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ThemeSelectorContainer>
      </DrawerContents>
    </Drawer>
  );

  return (
    <DrawerContainer>
      {drawer}
      {createAppBar(true, createLinks())}
    </DrawerContainer>
  );
};

export default Header;
