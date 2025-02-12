import { Typography, styled } from '@mui/material';
import isaac from '../../assets/isaac.jpg';
import { GITHUB_PROFILE_URL } from '../../constants';

const AboutContentDisplay = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '10px',
});

const AboutText = styled('div')({
  maxWidth: '550px',
});

const ProfileImage = styled('img')({
  height: '400px',
  backgrounSize: 'cover',
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
  borderRadius: '15px',
});

function About() {
  const dateWhenIBecameAProfessional = new Date('2018-08-01');
  const diffInMilliseconds = Math.abs(
    Date.now() - dateWhenIBecameAProfessional.getTime()
  );
  const diffInYears = Math.ceil(
    diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)
  );

  return (
    <>
      <Typography variant="h2">About Me</Typography>
      <AboutContentDisplay>
        <AboutText>
          <p>
            My journey with software began during my time in the Marine Corps,
            around 2013. Initially, I dabbled in website creation using pure
            HTML, CSS, and JavaScript, taking every course and tutorial I could
            find to hone my skills. This budding interest in software
            development turned into a passion.
          </p>
          <p>
            After leaving the military, I pursued this passion further by
            earning a degree in Information Systems with a focus on application
            development. During college, I secured a software internship in my
            junior year, which allowed me to apply my theoretical knowledge in a
            real-world setting. This experience was invaluable and solidified my
            career path.
          </p>
          <p>
            For the past {diffInYears} years, I've been working as a Software
            Engineer and Developer, tackling various challenging projects and
            continuously expanding my skill set.
          </p>
          <p>
            I love being a perpetual learner and seeing how my skills evolve
            over time. Whether it's mastering a new programming language or
            diving into the latest industry trends, I'm always eager to learn
            and grow.
          </p>
        </AboutText>
        <ProfileImage src={isaac} alt="Isaac's Profile" />
      </AboutContentDisplay>{' '}
      <p>
        Interested in some of my work? Check out my{' '}
        <a href={GITHUB_PROFILE_URL} target="_blank" rel="noreferrer">
          GitHub
        </a>
        {'.'}
      </p>
    </>
  );
}

export default About;
