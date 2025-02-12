import { styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import construction from '../../assets/construction.png';

const ConstructionImage = styled('img')({
  height: "300px"
})

const Experiments = () => {
  return (
    <>
      <Typography variant="h2">Experiments</Typography>
      <ConstructionImage src={construction} alt="Under Construction" />
      <p>
        Check out some of these work-in-progress experiments I am playing around
        with!
      </p>
      <Link to={'visualizer'}>Data structures and Algorithms Visualizer</Link>
      <br />
      <Link to={'Reader'}>Reader</Link>
      <br />
      <Link to={'soundGenerator'}>Sound Generator</Link>
      <br />
      <Link to={'pomodoro'}>Pomodoro</Link>
      <br />
      <Link to={'fetching'}>Fetching</Link>
    </>
  );
}

export default Experiments;
