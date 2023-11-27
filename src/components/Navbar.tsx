import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from "react-router-dom"
import MenuIcon from '@mui/icons-material/Menu';

let Navbar = () => {
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
          News
        </Typography>
        <Button color="inherit">
          <Link to={"/portfolio"}>Home</Link>
        </Button>
        <Button color="inherit">
          <Link to={"about"}>About</Link>
        </Button>
        <Button color="inherit">
          <Link to={"resume"}>Resume</Link>
        </Button>
        <Button color="inherit">
          <Link to={"visualizer"}>Visualizer</Link>
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;
