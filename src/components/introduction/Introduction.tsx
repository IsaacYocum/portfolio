import { Square } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import linuxButtons from '../../assets/terminalButtons.png';
import { useInterval } from '../../hooks/customHooks';

const Terminal = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '850px',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
  width: '100%',
  color: '#f9f8f9'
});

const TerminalHeader = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexShrink: '0',
  alignItems: 'center',
  backgroundImage: 'linear-gradient(#626055, #3e3d39)',
  textAlign: 'center',
  paddingRight: '5px',
});

const HeaderSpacing = styled('div')({
  flex: '1 1 auto',
});

const TerminalTitle = styled(Typography)({
  margin: '0 5px',
});

const TerminalBody = styled('div')({
  paddingTop: '5px',
  paddingLeft: '5px',
  backgroundColor: '#300924',
});

const TerminalLine = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
});

const CodeSpan1 = styled('span')({
  color: '#8ae234'
});

const CodeSpan2 = styled('span')({
  color: '#719fce'
});

const OuterHeadings = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const InnerHeadings = styled('div')({
  height: '40px',
  lineHeight: '40px',
  fontSize: '35px',
  textTransformation: 'uppercase',
  overflow: 'hidden',
});

const InnerHeadingsSpan = styled('span')({
  position: 'relative',
  animation: 'animation 10s ease infinite',
  '@keyframes animation': {
    '0%, 100%': { top: '0' },
    '20%': { top: '0' },
    '25%': { top: '-40px' },
    '45%': { top: '-40px' },
    '50%': { top: '-80px' },
    '70%': { top: '-80px' },
    '75%': { top: '-120px' },
    '95%': { top: '-120px' },
  },
});

const Cursor = styled(Square)({
  marginLeft: '5px',
});

const TerminalButtons = styled('img')({
  width: '67px',
});

const Introduction = () => {
  const [showCursor, setShowCursor] = useState(false);
  useInterval(() => setShowCursor(!showCursor), 700);

  return (
    <>
      <Typography variant="h2">
        Hi, I'm
        <CodeSpan1> Isaac</CodeSpan1>
      </Typography>
      <Typography variant="h3">
        Welcome to my site... Please take a look around!
      </Typography>
      <Divider />
      <Terminal>
        <TerminalHeader>
          <HeaderSpacing />
          <TerminalTitle variant="h4">
            isaacyocum@dev: ~/portfolio
          </TerminalTitle>
          <HeaderSpacing />
          <TerminalButtons src={linuxButtons} alt="linuxTerminalButtons" />
        </TerminalHeader>
        <TerminalBody>
          <TerminalLine variant="h4">
            <CodeSpan1>isaacyocum@dev</CodeSpan1>:
            <CodeSpan2>~/portfolio</CodeSpan2>$ pwd
          </TerminalLine>
          <Typography variant="h4">/home/portfolio</Typography>
          <TerminalLine variant="h4">
            <CodeSpan1>isaacyocum@dev</CodeSpan1>:
            <CodeSpan2>~/portfolio</CodeSpan2>$ whoami
          </TerminalLine>
          <OuterHeadings>
            <InnerHeadings>
              <InnerHeadingsSpan>
                Full-Stack Developer <br />
                UI/UX Designer <br />
                Software Engineer <br />
                Perpetual Learner <br />
              </InnerHeadingsSpan>
            </InnerHeadings>
          </OuterHeadings>
          <TerminalLine variant="h4">
            <CodeSpan1>isaacyocum@dev</CodeSpan1>:
            <CodeSpan2>~/portfolio</CodeSpan2>$
            {showCursor && <Cursor fontSize="large" />}
          </TerminalLine>
        </TerminalBody>
      </Terminal>
    </>
  );
};

export default Introduction;
