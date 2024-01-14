import { FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Slider } from "@mui/material";
import { ChangeEvent } from "react";

const DEFAULT_FREQUENCY = 420;
const DEFAULT_VOL = 10;
const DEFAULT_TYPE = "sine";

const audioContext = new AudioContext();
let osc = audioContext.createOscillator();
let vol = audioContext.createGain();
osc.frequency.value = DEFAULT_FREQUENCY;
osc.type = DEFAULT_TYPE;
vol.gain.value = DEFAULT_VOL / 100;
osc.connect(vol)
vol.connect(audioContext.destination)
osc.detune.value = 100;

console.log('render outside SoundGenerator')

let SoundGenerator = () => {
  console.log('render inside SoundGenerator')
  let startSound = async () => {
    if (osc.context.state === 'running') {
      vol.connect(audioContext.destination)
    } else {
      osc.start(0)
    }
  }

  let stopSound = async () => {
    vol.disconnect(audioContext.destination)
  }

  let handleFrequencyChange = (_: Event, newFrequency: number | number[]) => {
    osc.frequency.value = newFrequency as number;
  }

  let handleVolumeChange = (_: Event, newVolume: number | number[]) => {
    vol.gain.value = newVolume as number / 100;
  }

  let handleTypeChange = (_: ChangeEvent<HTMLInputElement>, newType: string) => {
    osc.type = newType as OscillatorType;
  }

  return (
    <div>
      <div>Sound Generator</div>
      <button
        onClick={startSound}
      >
        Start
      </button>
      <button
        onClick={stopSound}
      >
        Stop
      </button>
      <div>Frequency (hz)</div>
      <Slider
        defaultValue={DEFAULT_FREQUENCY}
        getAriaValueText={(f: number) => `${f}hz`}
        valueLabelDisplay="auto"
        marks={[
          {
            value: 0,
            label: '0'
          },
          {
            value: 20000,
            label: '20000'
          },
        ]}
        min={0}
        max={20000}
        onChange={handleFrequencyChange}
      />
      <div>Volume</div>
      <Slider
        defaultValue={DEFAULT_VOL}
        getAriaValueText={(v: number) => `${v}%`}
        valueLabelDisplay="auto"
        marks={[
          {
            value: 0,
            label: '0'
          },
          {
            value: 100,
            label: '100'
          },
        ]}
        min={0}
        max={100}
        onChange={handleVolumeChange}
      />
      <FormGroup>
        <FormLabel id="wave-type-label">Wave Type</FormLabel>
        <RadioGroup
          aria-labelledby="wave-type-label"
          defaultValue={DEFAULT_TYPE}
          onChange={handleTypeChange}
        >
          <FormControlLabel value="sine" control={<Radio />} label="Sine" />
          <FormControlLabel value="square" control={<Radio />} label="Square" />
          <FormControlLabel value="sawtooth" control={<Radio />} label="Sawtooth" />
          <FormControlLabel value="triangle" control={<Radio />} label="Triangle" />
        </RadioGroup>
      </FormGroup>
    </div>
  )
}

export default SoundGenerator;
