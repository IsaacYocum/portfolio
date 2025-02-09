import { Button, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, Slider, Typography, useTheme } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const DEFAULT_FREQUENCY = 420;
const DEFAULT_VOL = 10;
const DEFAULT_TYPE = "sine";

const styles = {
  buttons: {
    display: 'flex',
    gap: '10px'
  },
  formGroup: {
    paddingTop: '20px'
  }
}

const SoundGenerator = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [audioContextStarted, setAudioContextStarted] = useState(false);

  const osc = useRef<OscillatorNode | null>(null);
  const oscStarted = useRef(false);

  const vol = useRef<GainNode | null>(null);

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
      osc.current = audioContextRef.current.createOscillator();
      vol.current = audioContextRef.current.createGain();
      osc.current.frequency.value = DEFAULT_FREQUENCY;
      osc.current.type = DEFAULT_TYPE;
      vol.current.gain.value = DEFAULT_VOL / 100;
      osc.current.connect(vol.current)
      vol.current.connect(audioContextRef.current.destination)
      osc.current.detune.value = 100;
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
        osc.current = null;
        vol.current = null;
        oscStarted.current = false;
      }
    };
  }, [])

  const startSound = () => {
    if (osc.current && !oscStarted.current) {
      osc.current.start()
      oscStarted.current = true;
    }

    if (audioContextRef.current && audioContextRef.current?.state !== 'running') {
      audioContextRef.current.resume()
    }
    setAudioContextStarted(true);
  }

  const stopSound = () => {
    if (audioContextRef.current?.state === 'running') {
      audioContextRef.current.suspend()
      setAudioContextStarted(false);
    }
  }

  const handleFrequencyChange = (_: Event, newFrequency: number | number[]) => {
    if (osc.current) {
      osc.current.frequency.value = newFrequency as number;
    }
  }

  const handleVolumeChange = (_: Event, newVolume: number | number[]) => {
    if (vol.current) {
      vol.current.gain.value = newVolume as number / 100;
    }
  }

  const handleTypeChange = (_: ChangeEvent<HTMLInputElement>, newType: string) => {
    if (osc.current) {
      osc.current.type = newType as OscillatorType;
    }
  }

  return (
    <>
      <Typography variant="h3">Sound Generator</Typography>
      <div style={styles.buttons}>
        <Button
          variant="outlined"
          onClick={startSound}
          disabled={audioContextStarted}
        >
          Start
        </Button>
        <Button
          variant="outlined"
          onClick={stopSound}
          disabled={!audioContextStarted}
        >
          Stop
        </Button>
      </div>
      <p>Frequency (hz)</p>
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
      <p>Volume</p>
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
      <FormGroup style={styles.formGroup}>
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
    </>
  )
}

export default SoundGenerator;
