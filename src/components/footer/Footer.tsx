import { useTheme } from "@mui/material";
import { Typography, Link as LinkBase } from '@mui/material';
import { FC } from "react";
import { Link } from "react-router-dom";
import { VISIBLE_LINKS } from "../../routes/routes";
import './Footer.css';

type FooterProps = { repoViewer?: React.ReactNode | null }

let Footer: FC<FooterProps> = ({ repoViewer }) => {
  let theme = useTheme();

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
          <p className='footerHeader'>Site</p>
          {VISIBLE_LINKS.map(route => (
            <p
              key={route.title}
              className="linkItem"
            >
              <LinkBase
                style={linkStyles}
                to={route.path}
                component={Link}
              >
                <Typography>{route.title}</Typography>
              </LinkBase>
            </p>
          ))}
        </div>
        <div className="flexLinks">
          <p className='footerHeader'>Contact</p>
          <p><LinkBase style={linkStyles} href="mailto:isyocum@gmail.com">Email</LinkBase></p>
          <p><LinkBase style={linkStyles} href="https://github.com/IsaacYocum" target='_blank'>GitHub</LinkBase></p>
          <p><LinkBase style={linkStyles} href="https://www.linkedin.com/in/isaacyocum/" target='_blank'>LinkedIn</LinkBase></p>
        </div>
        <div id="footerProjects">
          <p className='footerHeader'>Projects</p>
          <div className="footerRepoList">
            {repoViewer}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
