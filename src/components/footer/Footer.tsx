import { useTheme } from "@mui/material";

let Footer = () => {
  let theme = useTheme();

  let styles = {
    backgroundColor: theme.palette.background.paper
  }

  return (
    <div style={styles}>
      <hr />
      <div>Footer</div>
      <div>
        <ul>Contact info</ul>
        <ul>email</ul>
        <ul>github</ul>
        <ul>linkedin</ul>
        <ul>Facebook?</ul>
      </div>
    </div>
  )
}

export default Footer;
