import isaac from '../../assets/isaac.jpg'

let imgStyle = {
  height: '500px'
}

function About() {
  return (
    <div>
      <div>About</div>
      <div>Veteran</div>
      <div>Firefighter</div>
      <div>always trying new things</div>
      <div>automoitve mechanic</div>
      <div>always been interested in how things work and coming up with new and intuitive ways to solve problems</div>
      <div>perpetual learner</div>
      <div>aspiring creative</div>
      <div>knows what hard work is</div>
      <div>
        Interested in some of my work? Checkout my <a href='https://github.com/IsaacYocum' target='_blank'>github</a>
      </div>
      <img src={isaac} alt='Stunning photo of Isaac' style={imgStyle} />
    </div>
  );
}

export default About;
