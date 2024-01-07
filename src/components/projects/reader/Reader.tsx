import { TextField, Button, Typography, Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useInterval } from "../../../hooks/customHooks";
import './Reader.css'

let startTime: number = 0;
let inputWaitTimeout: NodeJS.Timer | null = null;


enum ReaderStatus {
  RUNNING = 'running',
  PAUSED = 'paused',
  STOPPED = 'stopped'
}

const STARTER_TEXT =
  `Do I need to be liked? Absolutely not. I like to be liked. I enjoy being liked. I have to be liked. But it’s not like this compulsive need like my need to be praised.
\nThat has sort of an oak-y afterbirth.
\nI learned a while back that if I do not text 911, people do not return my calls. Um, but people always return my calls because they think that something horrible has happened.
\nAnd I knew exactly what to do. But in a much more real sense, I had no idea what to do.
`

let Reader = () => {
  let [text, setText] = useState(STARTER_TEXT);
  let [displayText, setDisplayText] = useState<string[]>([]);
  let [displayTextIndex, setDisplayTextIndex] = useState(0);
  let [timerDelay, setTimerDelay] = useState<number>(300)
  let [delay, setDelay] = useState<number | null>(null)
  let [elapsedTime, setElapsedTime] = useState<number>(0)
  let [runningTime, setRunningTime] = useState<number>(0)
  let [pauseStarted, setPausedStarted] = useState<number>(0)
  let [pausedTime, setPausedTime] = useState<number>(0)
  let [expectedDuration, setExpectedDuration] = useState<number>(0)
  let [runningState, setRunningState] = useState<ReaderStatus>(ReaderStatus.STOPPED)
  let [showStats, setShowStats] = useState(true);

  useEffect(() => {
    getWords(STARTER_TEXT)
  }, [])

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

  let handleTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (inputWaitTimeout) clearTimeout(inputWaitTimeout);
    inputWaitTimeout = null;

    setText(evt.target.value);
    inputWaitTimeout = setTimeout(() => getWords(evt.target.value), 1000);
  }

  let handleTimerDelayChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTimerDelay(parseInt(evt.target.value));
    setExpectedDuration(parseFloat((displayText.length * (60 / parseInt(evt.target.value))).toFixed(2)));
  }

  function getWords(textValue: string): string[] {
    const words = textValue.match(/(\b[^\s]+\b)/g);
    if (words && words?.length > 0) {
      setDisplayText(words);
      setExpectedDuration(parseFloat((words.length * (60 / timerDelay)).toFixed(2)));
      return words;
    }

    inputWaitTimeout = null;
    return [];
  }

  let handleStartTimer = () => {
    if (runningState === ReaderStatus.STOPPED) {
      handleResetTimer();
      startTime = Date.now();
    }

    if (runningState === ReaderStatus.PAUSED) {
      setPausedTime(prevPausedTime => Date.now() - pauseStarted + prevPausedTime)
    }

    setRunningState(ReaderStatus.RUNNING);
    setDelay((60 / timerDelay) * 1000);
  }

  let handleStopTimer = (running: ReaderStatus) => {
    if (running === ReaderStatus.PAUSED) {
      setPausedStarted(Date.now())
    }

    setRunningState(running);
    setDelay(null);
  }

  let handleResetTimer = () => {
    startTime = Date.now();
    setRunningState(ReaderStatus.STOPPED);
    setRunningTime(0);
    setPausedTime(0);
    setElapsedTime(0);
    setDisplayTextIndex(0);
    setDelay(null);
  }

  return (
    <div id="reader">
      <div id="readerSettings">
        <div id="readerSettingsContent">
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
            type='number'
            value={timerDelay}
            fullWidth
            onChange={handleTimerDelayChange}
          />
          <br />
          <br />
          <div id="readerSettingsButtons">
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
              variant='contained'
              onClick={() => handleStartTimer()}
              disabled={runningState === ReaderStatus.RUNNING}
            >
              {runningState === ReaderStatus.PAUSED ? "Continue" : "Start"}
            </Button>
            <Button
              variant='contained'
              onClick={() => handleStopTimer(ReaderStatus.PAUSED)}
              disabled={runningState === ReaderStatus.STOPPED || runningState === ReaderStatus.PAUSED}
            >
              Pause
            </Button>
            <Button
              variant='contained'
              onClick={handleResetTimer}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
      <div id="readerDisplay">
        {showStats ?
          <div id="statsDisplay">
            <table>
              <tbody>
                <tr>
                  <td>Words read:</td>
                  <td>{displayTextIndex <= 0 ? 0 : displayTextIndex + 1} / {displayText.length}</td>
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
          </div>
          : null}
        <Typography variant="h1">{runningState === ReaderStatus.STOPPED ? "Click Start to begin" : displayText[displayTextIndex]}</Typography>
      </div>
    </div >
  )
}

export default Reader;
