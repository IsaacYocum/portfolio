import { Button } from "@mui/material";
import { useState } from "react";

let Visualizer = () => {
  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  let [min, setMin] = useState(0);
  let [max, setMax] = useState(0);

  let [curr, setCurr] = useState(0);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

  let start = () => {
    console.log('start')
    //iterate(testArray);
    binarySearch(testArray, 14)
  };

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
    await delay(2000);

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

  interface Border {
    border?: string;
    borderImage?: string;
  }

  let getBorderColor = (i: number) => {
    let colors = []
    let border: Border = {};

    if (i === min) {
      colors.push('blue')
    }
    if (i === max) {
      colors.push('red')
    }

    if (i === curr) {
      colors.push('green')
    }

    if (colors.length > 0) {
      let gradientPercent = 100 / colors.length;
      if (gradientPercent <= 100) {
        let gradient = colors.map((color, i) => `${color + ' ' + gradientPercent * i + '% ' + gradientPercent * (i + 1)}% `)
        border.border = 'solid'
        border.borderImage = `linear-gradient(45deg, ${gradient}) 1`
      }
    }

    return border;
  }

  let getStyle = (i: number) => {
    console.log(i)

    return {
      ...getBorderColor(i),
      padding: '10px',
      margin: '10px',
    }
  }

  let flexContainer = {
    display: 'flex',
    'flex-wrap': 'wrap'
  }

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <p style={{ paddingRight: '10px' }}>Visualizer</p>
        <Button
          onClick={start}
          variant='contained'
        >
          Start
        </Button>
      </div>
      <div style={flexContainer}>
        {testArray.map(i => <div style={getStyle(i)}>{i}</div>)}
      </div>
    </div >
  )
}

export default Visualizer;

