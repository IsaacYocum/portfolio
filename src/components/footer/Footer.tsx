import { useTheme } from "@mui/material";
import { Typography } from '@mui/material';
import { Link } from "react-router-dom";
import routes from "../../routes/routes";
import './Footer.css';

let Footer = () => {
  let theme = useTheme();
  console.log(theme)

  let styles = {
    backgroundColor: theme.palette.primary.light,
  }

  return (
    <footer
      id="footer"
      style={styles}
    >
      <div className="footerContent">
        <div className="flexLinks">
          <ul>Links</ul>
          {routes[1].children?.map(route => (
            !route.path.includes('/') ?
              <ul className="linkItem">
                <Link
                  to={route.path}
                >
                  <Typography>{route.title}</Typography>
                </Link>
              </ul>
              : null
          ))}
        </div>
        <div className="flexLinks">
          <ul>Contact</ul>
          <ul><a href="mailto:isyocum@gmail.com">Email</a></ul>
          <ul><a href="https://github.com/IsaacYocum" target='_blank'>GitHub</a></ul>
          <ul><a href="https://www.linkedin.com/in/isaacyocum/" target='_blank'>LinkedIn</a></ul>
        </div>

        <div>
          <ul>Projects</ul>
          <div className="flexFiller">
            <div className="projectPlaceholder">Project placeholder</div>
            <div className="projectPlaceholder">Project placeholder</div>
            <div className="projectPlaceholder">Project placeholder</div>
            <div className="projectPlaceholder">Project placeholder</div>
            <div className="projectPlaceholder">Project placeholder</div>
            <div className="projectPlaceholder">Project placeholder</div>
          </div>
        </div>
      </div >
    </footer >
  )
}

export default Footer;
