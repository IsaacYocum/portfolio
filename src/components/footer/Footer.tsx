import { useTheme } from "@mui/material";
import { Typography, Link as LinkBase } from '@mui/material';
import { FC } from "react";
import { Link } from "react-router-dom";
import routes from "../../routes/routes";
import './Footer.css';

type FooterProps = { projects?: Array<any> }

let Footer: FC<FooterProps> = ({ projects }) => {
  let theme = useTheme();
  console.log(theme)

  let styles = {
    backgroundColor: theme.palette.background.footer,
    color: theme.palette.text.footer,
  }

  let linkStyles = {
    color: theme.palette.text.footer,
  }

  return (
    <footer
      id="footer"
      style={styles}
    >
      <div className="footerContent">
        <div className="flexLinks">
          <ul className='footerHeader'>Site</ul>
          {routes[1].children?.map(route => (
            !route.path.includes('/') ?
              <ul className="linkItem">
                <LinkBase
                  style={linkStyles}
                  to={route.path}
                  component={Link}
                >
                  <Typography>{route.title}</Typography>
                </LinkBase>
              </ul>
              : null
          ))}
        </div>
        <div className="flexLinks">
          <ul className='footerHeader'>Contact</ul>
          <ul><LinkBase style={linkStyles} href="mailto:isyocum@gmail.com">Email</LinkBase></ul>
          <ul><LinkBase style={linkStyles} href="https://github.com/IsaacYocum" target='_blank'>GitHub</LinkBase></ul>
          <ul><LinkBase style={linkStyles} href="https://www.linkedin.com/in/isaacyocum/" target='_blank'>LinkedIn</LinkBase></ul>
        </div>
        <div id="footerProjects">
          <ul className='footerHeader'>Projects</ul>
          <div className="flexFiller">
            {projects?.map(project => {
              return (
                <div className="projectPlaceholder">{project.name}</div>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
