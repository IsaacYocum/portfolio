import { Typography } from "@mui/material";
import { useTheme, withTheme } from "@mui/material/styles";

let Home = () => {
  const theme = useTheme();
  console.log(theme)

  return (
    <Typography variant="body1">home</Typography>
  )
}


export default Home;

