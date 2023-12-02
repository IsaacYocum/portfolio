import { Box, Button, PaletteColor, TextField, useTheme } from "@mui/material";
import { useState } from "react";
import './Visualizer.css'

let Visualizer = () => {
  const theme = useTheme();
  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  let [min, setMin] = useState(0);
  let [max, setMax] = useState(0);
  let [curr, setCurr] = useState(0);
  let [target, setTarget] = useState(`${testArray[0]}`);
  let [error, setError] = useState('');

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

  let handleStart = () => {
    console.log('start')
    //iterate(testArray);
    binarySearch(testArray, parseInt(target))
  };

  let hasErrors = (targ = target) => {
    console.log(targ, typeof targ)
    if (typeof targ !== "number") {
      setError('Must be a number');
      return true;
    }

    setError('');
    return false;
  }

  async function iterate(arr: Array<number>) {
    for (let i = 0; i < arr.length; i++) {
      setCurr(arr[i]);
      await delay(1000);
    }
  };

  async function binarySearch(arr: Array<number>, target: number) {
    let beg = 0;
    let end = arr.length - 1;
    let mid = Math.floor((end + beg) / 2);
    setCurr(arr[mid]);
    setMin(arr[beg]);
    setMax(arr[end]);

    while (beg <= end) {
      let mid = Math.floor((end + beg) / 2);
      setCurr(arr[mid]);
      await delay(2000);
      if (arr[mid] === target) return mid;

      if (arr[mid] < target) {
        beg = mid + 1;
        setMin(arr[beg]);
        await delay(2000);
      }

      if (arr[mid] > target) {
        end = mid - 1;
        setMax(arr[end]);
        await delay(2000);
      }

    }

    return -1;
  };

  interface Style {
    backgroundColor?: any;
    background?: any;
    transition?: string;
    height?: string;
    width?: string;
    color: string;
    WebkitTransition: string;
    margin: string;
    padding: string;
  }

  let getNodeStyle = (i: number) => {
    let colors = []
    let style: Style = {
      height: '50px',
      width: '50px',
      transition: 'all .5s linear',
      WebkitTransition: 'all .5s linear',
      color: 'black',
      padding: '10px',
      margin: '10px',
    };

    if (i === min) {
      colors.push('blue')
    }

    if (i === curr) {
      colors.push('green')
    }

    if (i === max) {
      colors.push('red')
    }

    if (colors.length === 0) {
      style.background = theme.palette.secondary.light
    }

    if (colors.length > 0) {
      style.color = 'gold'
    }

    if (colors.length === 1) {
      style.background = colors[0]
    }

    if (colors.length > 1) {
      let gradientPercent = 100 / colors.length;
      if (gradientPercent <= 100) {
        let gradient = colors.map((color, i) => `${color + ' ' + gradientPercent * i + '% ' + gradientPercent * (i + 1)}%`)
        style.background = `linear-gradient(45deg, ${gradient})`
      }
    }

    return style;
  }

  let handleChangeTarget = (event: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;
    let value = event.target.value;

    if (value === '') {
      setTarget(value)
      setError('Must be a number')
    } else if (re.test(value)) {
      if (testArray.includes(parseInt(value))) {
        setTarget(value)
        setError('')
      } else {
        setTarget(value)
        setError('Target must be in array')
      }
    } else {
      setError('Must be a number')
    }
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
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
      </div>
      <hr></hr>
      <div className='flexContainer'>
        {testArray.map(i => <div key={'node' + i} style={getNodeStyle(i)}>{i}</div>)}
      </div>
    </div >
  )
}

export default Visualizer;

