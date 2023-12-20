import { useTheme } from "@mui/material";
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
          Links
          <ul>Home</ul>
          <ul>About</ul>
          <ul>Resume</ul>
          <ul>Projects</ul>
        </div>
        <div className="flexLinks">
          Contact
          <ul>email</ul>
          <ul>github</ul>
          <ul>linkedin</ul>
          <ul>Facebook?</ul>
        </div>
        <div className="flexFiller">Projects</div>
      </div>
    </footer>
  )
}

export default Footer;
