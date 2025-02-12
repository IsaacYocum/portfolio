import { Typography, styled } from '@mui/material';
import isaac from '../../assets/isaac.jpg';
import { GITHUB_PROFILE_URL } from '../../constants';

const AboutContentDisplay = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '10px'
})

const AboutText = styled('div')({
  maxWidth: '550px'
})

const ProfileImage = styled('img')({
  height: '400px',
  backgrounSize: 'cover',
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
  borderRadius: '15px'
})

function About() {
  const dateWhenIBecameAProfessional = new Date('2018-08-01');
  const diffInMilliseconds = Math.abs(Date.now() - dateWhenIBecameAProfessional.getTime());
  const diffInYears = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));

  return (
    <>
      <Typography variant='h2'>About</Typography>
      <AboutContentDisplay>
        <AboutText>
          <p>My journey with software began while I was in the Marine Corps around the year 2013.</p>
          <p>I started messing around making websites with pure HTML and CSS and JavaScript and taking any courses or tutorials I could find.</p>
          <p>After leaving the military I decided to pursue this interest with a degree in Information Systems with a focus on application development.</p>
          <p>While in college I got a software internship in my Junior year to further develop my skills.</p>
          <p>Now, I've been a Software Engineer and Developer for {diffInYears} years.</p>
          <p>I love being a perpetual learner and seeing how my skills develop over the years.</p>
          <p>
            Interested in some of my work? Check out my <a href={GITHUB_PROFILE_URL} target='_blank' rel='noreferrer'>GitHub</a>.
          </p>
        </AboutText>
        <ProfileImage src={isaac} alt="Isaac's Profile" />
      </AboutContentDisplay>
    </>
  );
}

export default About;
