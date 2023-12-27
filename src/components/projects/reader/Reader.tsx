import { TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useInterval } from "../../../hooks/customHooks";
import './Reader.css'

let Reader = () => {
  let [text, setText] = useState(`Do I need to be liked? Absolutely not. I like to be liked. I enjoy being liked. I have to be liked. But it’s not like this compulsive need like my need to be praised.
\nThat has sort of an oak - y afterbirth.
\nI learned a while back that if I do not text 911, people do not return my calls. Um, but people always return my calls because they think that something horrible has happened.
\nAnd I knew exactly what to do. But in a much more real sense, I had no idea what to do.
    `);
  let [displayText, setDisplayText] = useState<string[]>([]);
  let [displayTextIndex, setDisplayTextIndex] = useState(0);
  let [time, setTime] = useState(0);
  let [timerDelay, setTimerDelay] = useState<number>(300)
  let [delay, setDelay] = useState<number | null>(null)

  useInterval(() => {
    if (displayTextIndex < displayText?.length - 1) {
      setDisplayTextIndex(displayTextIndex + 1)
      setTime(time + 1)
    } else {
      handleStopTimer();
    }
  }, delay);

  let handleTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setText(evt.target.value);
  }

  let handleTimerDelayChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTimerDelay(parseInt(evt.target.value));
  }

  let handleStartTimer = () => {
    const words = text.match(/(\b[^\s]+\b)/g);
    if (words && words?.length > 0) {
      setDisplayText(words);
    }

    setDelay((60 / timerDelay) * 1000);
  }

  let handleStopTimer = () => setDelay(null);

  let handleTimerReset = () => {
    setTime(0);
    setDisplayText([]);
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
            <Button
              variant='contained'
              onClick={() => handleStartTimer()}
            >
              Start
            </Button>
            <Button
              variant='contained'
              onClick={handleStopTimer}
            >
              Stop
            </Button>
            <Button
              variant='contained'
              onClick={handleTimerReset}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
      <div id="readerDisplay">
        <p>Words read: {time}</p>
        <Typography variant="h1">{displayText?.length !== 0 ? displayText[displayTextIndex] : "Click Start to begin"}</Typography>
      </div>
    </div>
  )
}

export default Reader;
