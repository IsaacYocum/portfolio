import {
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useInterval } from '../../../hooks/useInterval';

let startTime: number = 0;
let inputWaitTimeout: NodeJS.Timer | null = null;

enum ReaderStatus {
  RUNNING = 'running',
  PAUSED = 'paused',
  STOPPED = 'stopped',
}

const STARTER_TEXT = `Do I need to be liked? Absolutely not. I like to be liked. I enjoy being liked. I have to be liked. But it’s not like this compulsive need like my need to be praised.
\nThat has sort of an oak-y afterbirth.
\nI learned a while back that if I do not text 911, people do not return my calls. Um, but people always return my calls because they think that something horrible has happened.
\nAnd I knew exactly what to do. But in a much more real sense, I had no idea what to do.
`;

const MediaQueryWrapper = styled('section')({
  minHeight: 0,
  width: '100%',
  "@media screen and (max-width: 63em)": {
    "#reader": { flexDirection: "column" },
    "#readerSettings": { flex: "0 0 20em" },
  },
  "@media screen and (max-width: 40em)": {
    "#readerSettingsButtons": { 
      flexDirection: "column",
      alignContent: 'center'
    },
  }
})

const ReaderContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  // justifyItems: 'center',
  width: '100%',
});

const ReaderSettings = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  flex: '0 0 66%',
});

const ReaderSettingsContent = styled('div')({
  width: '100%',
});

const ReaderSettingsButtons = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '5px',
});

const ReaderDisplay = styled('div')({
  textWrap: "anywhere",
  flex: '1 1 auto',
  textAlign: 'center',
});

const StatsDisplay = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'left',
  marginTop: '1rem',
  marginBottom: '1rem',
  '#statsDisplay td': {
    paddingRight: '1rem',
  },
  minWidth: '250px'
});

const Reader = () => {
  const [text, setText] = useState(STARTER_TEXT);
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [displayTextIndex, setDisplayTextIndex] = useState(0);
  const [timerDelay, setTimerDelay] = useState<number>(300);
  const [delay, setDelay] = useState<number | undefined>(undefined);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [runningTime, setRunningTime] = useState<number>(0);
  const [pauseStarted, setPauseStarted] = useState<number>(0);
  const [pausedTime, setPausedTime] = useState<number>(0);
  const [expectedDuration, setExpectedDuration] = useState<number>(0);
  const [runningState, setRunningState] = useState<ReaderStatus>(
    ReaderStatus.STOPPED
  );
  const [showStats, setShowStats] = useState(true);

  useEffect(() => {
    getWords(STARTER_TEXT);
  }, [getWords]);

  useInterval(() => {
    if (displayTextIndex < displayText?.length - 1) {
      setDisplayTextIndex(displayTextIndex + 1);
      let totalTime = Date.now() - startTime;
      setRunningTime(parseFloat(((totalTime - pausedTime) / 1000).toFixed(2)));
      setElapsedTime(parseFloat((totalTime / 1000).toFixed(2)));
    } else {
      handleStopTimer(ReaderStatus.STOPPED);
    }
  }, delay);

  const handleTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (inputWaitTimeout) clearTimeout(inputWaitTimeout);
    inputWaitTimeout = null;

    setText(evt.target.value);
    inputWaitTimeout = setTimeout(() => getWords(evt.target.value), 1000);
  };

  const handleTimerDelayChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTimerDelay(parseInt(evt.target.value));
    setExpectedDuration(
      parseFloat(
        (displayText.length * (60 / parseInt(evt.target.value))).toFixed(2)
      )
    );
  };

  function getWords(textValue: string): string[] {
    const words = textValue.match(/(\b[^\s]+\b)/g);
    if (words && words?.length > 0) {
      setDisplayText(words);
      setExpectedDuration(
        parseFloat((words.length * (60 / timerDelay)).toFixed(2))
      );
      return words;
    }

    inputWaitTimeout = null;
    return [];
  }

  const handleStartTimer = () => {
    if (runningState === ReaderStatus.STOPPED) {
      handleResetTimer();
      startTime = Date.now();
    }

    if (runningState === ReaderStatus.PAUSED) {
      setPausedTime(
        (prevPausedTime) => Date.now() - pauseStarted + prevPausedTime
      );
    }

    setRunningState(ReaderStatus.RUNNING);
    setDelay((60 / timerDelay) * 1000);
  };

  const handleStopTimer = (running: ReaderStatus) => {
    if (running === ReaderStatus.PAUSED) {
      setPauseStarted(Date.now());
    }

    setRunningState(running);
    setDelay(undefined);
  };

  const handleResetTimer = () => {
    startTime = Date.now();
    setRunningState(ReaderStatus.STOPPED);
    setRunningTime(0);
    setPausedTime(0);
    setElapsedTime(0);
    setDisplayTextIndex(0);
    setDelay(undefined);
  };

  return (
    <MediaQueryWrapper id='mediaQueryWrapper'>
      <Typography variant="h3" align='center'>Reader</Typography>
      <ReaderContainer id="reader">
        <ReaderSettings id="readerSettings">
          <ReaderSettingsContent id="readerSettingsContent">
            <div>Text to read</div>
            <TextField
              placeholder="Add your text here..."
              multiline
              rows={8}
              value={text}
              fullWidth
              onChange={handleTextChange}
            />
            <br />
            <br />
            <div>Words per minute</div>
            <TextField
              placeholder="Timer delay / WPM"
              type="number"
              value={timerDelay}
              fullWidth
              onChange={handleTimerDelayChange}
            />
            <br />
            <br />
            <ReaderSettingsButtons id="readerSettingsButtons">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showStats}
                    onClick={() => setShowStats(!showStats)}
                  />
                }
                label="Show Stats"
              />
              <Button
                variant="contained"
                onClick={() => handleStartTimer()}
                disabled={runningState === ReaderStatus.RUNNING}
              >
                {runningState === ReaderStatus.PAUSED ? 'Continue' : 'Start'}
              </Button>
              <Button
                variant="contained"
                onClick={() => handleStopTimer(ReaderStatus.PAUSED)}
                disabled={
                  runningState === ReaderStatus.STOPPED ||
                  runningState === ReaderStatus.PAUSED
                }
              >
                Pause
              </Button>
              <Button variant="contained" onClick={handleResetTimer}>
                Reset
              </Button>
            </ReaderSettingsButtons>
          </ReaderSettingsContent>
        </ReaderSettings>
        <ReaderDisplay id="readerDisplay">
          {showStats ? (
            <StatsDisplay id="statsDisplay">
              <table>
                <thead>
                  <tr>
                    <th>Stats</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Words read:</td>
                    <td>
                      {displayTextIndex <= 0 ? 0 : displayTextIndex + 1} /{' '}
                      {displayText.length}
                    </td>
                  </tr>
                  <tr>
                    <td>Running Time:</td>
                    <td>{runningTime}s</td>
                  </tr>
                  <tr>
                    <td>Paused Time:</td>
                    <td>{pausedTime / 1000}s</td>
                  </tr>
                  <tr>
                    <td>Elapsed Time:</td>
                    <td>{elapsedTime}s</td>
                  </tr>
                  <tr>
                    <td>Expected duration:</td>
                    <td>{expectedDuration}s</td>
                  </tr>
                </tbody>
              </table>
            </StatsDisplay>
          ) : null}
          <Typography variant="h3">
            {runningState === ReaderStatus.STOPPED
              ? 'Click Start to begin'
              : displayText[displayTextIndex]}
          </Typography>
        </ReaderDisplay>
      </ReaderContainer>
    </MediaQueryWrapper>
  );
};

export default Reader;
