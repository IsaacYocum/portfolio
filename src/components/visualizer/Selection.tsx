import { Button, TextField, Typography } from "@mui/material"
import React from "react";
import SelectionProps from './Visualizer'

type SelectionProps = {
  handleStart: () => void;
  target: number;
  error: string;
  handleChangeTarget: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

let Settings = ({ handleStart, target, error, handleChangeTarget }: SelectionProps) => {
  return (
    <>
      <Typography variant="h6">Selection</Typography>
      <hr />
      <div style={{ display: 'flex' }}>
        <br></br>
        <div id='startButton'>
          <Button
            onClick={handleStart}
            variant='contained'
            disabled={error.length > 0}
          >
            Start
          </Button>
        </div>
        <div>
          <TextField
            label="Target"
            variant="outlined"
            type='number'
            value={target}
            helperText={error}
            error={error.length > 0}
            onChange={handleChangeTarget}
          />
        </div>
      </div >
    </>
  )
}

export default Settings;
