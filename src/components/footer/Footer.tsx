import { useTheme } from "@mui/material";

let Footer = () => {
  let theme = useTheme();

  let styles = {
    backgroundColor: theme.palette.background.paper
  }

  return (
    <footer style={styles}>
      <div>Links</div>
      <div>Site</div>
      <div>
        <ul>Contact info</ul>
        <ul>email</ul>
        <ul>github</ul>
        <ul>linkedin</ul>
        <ul>Facebook?</ul>
      </div>
      <div>Projects</div>
    </footer>
  )
}

export default Footer;
