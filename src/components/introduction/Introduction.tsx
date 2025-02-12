import {
  CancelOutlined,
  DoDisturbOnOutlined,
  Square,
  StopCircleOutlined,
} from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useInterval } from '../../hooks/customHooks';
import { useState } from 'react';

const Terminal = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '900px',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
  width: '100%',
});

const TerminalHeader = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexShrink: '0',
  alignItems: 'center',
  backgroundImage: 'linear-gradient(#626055, #3e3d39)',
  textAlign: 'center',
  paddingRight: '10px',
});

const HeaderSpacing = styled('div')({
  flex: '1 1 auto',
});

const TerminalBody = styled('div')({
  paddingTop: '5px',
  paddingLeft: '5px',
  backgroundColor: '#300924',
});

const CursorLine = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
});

const CodeSpan1 = styled('span')({
  color: '#76de34',
});

const CodeSpan2 = styled('span')({
  color: '#374da9',
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
          <Typography variant="h4">IsaacYocum@dev: ~/portfolio</Typography>
          <HeaderSpacing />
          <CancelOutlined />
          <DoDisturbOnOutlined />
          <StopCircleOutlined />
        </TerminalHeader>
        <TerminalBody>
          <Typography variant="h4">
            <CodeSpan1>IsaacYocum@dev</CodeSpan1>:
            <CodeSpan2>~/portfolio</CodeSpan2>$ pwd
          </Typography>
          <Typography variant="h4">/home/portfolio</Typography>
          <Typography variant="h4">
            <CodeSpan1>IsaacYocum@dev</CodeSpan1>:
            <CodeSpan2>~/portfolio</CodeSpan2>$ whoami
          </Typography>
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
          <CursorLine variant="h4">
            <CodeSpan1>IsaacYocum@dev</CodeSpan1>:
            <CodeSpan2>~/portfolio</CodeSpan2>$
            {showCursor && <Cursor fontSize="large" />}
          </CursorLine>
        </TerminalBody>
      </Terminal>
    </>
  );
};

export default Introduction;
