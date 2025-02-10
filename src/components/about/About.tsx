import { Typography } from '@mui/material';
import isaac from '../../assets/isaac.jpg'

const styles = {
  imgStyle: {
    height: '500px'
  },
  aboutDisplay: {
    display: 'flex',
    flexWrap: 'wrap' as 'wrap'
  },
  text: {
    maxWidth: '500px'
  }
}

function About() {
  return (
  <>
      <Typography variant='h2'>About</Typography>
      <div style={styles.aboutDisplay}>
        <div style={styles.text}>
          <p>Veteran</p>
          <p>Firefighter</p>
          <p>always trying new things</p>
          <p>automoitve mechanic</p>
          <p>always been interested in how things work and coming up with new and intuitive ways to solve problems</p>
          <p>perpetual learner</p>
          <p>aspiring creative</p>
          <p>knows what hard work is</p>
          <p>
            Interested in some of my work? Checkout my <a href='https://github.com/IsaacYocum' target='_blank'>GitHub</a>
          </p>
        </div>
        <div>
          <img src={isaac} alt='Stunning photo of Isaac' style={styles.imgStyle} />
        </div>
      </div>
    </>
  );
}

export default About;
