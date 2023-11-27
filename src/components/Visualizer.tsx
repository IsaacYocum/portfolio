import { Button } from "@mui/material";
import { useState } from "react";

let Visualizer = () => {
  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  let min = useState(testArray[0]);
  let max = useState(testArray[testArray.length - 1]);

  let [curr, setCurr] = useState(0);

  let binarySearch = () => {

  };

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

  let start = () => {
    console.log('start')
    iterate(testArray);
  };

  async function iterate(arr: Array<number>) {
    for (let i = 0; i < arr.length; i++) {
      setCurr(arr[i]);
      await delay(1000);
    }
  };

  return (
    <div>
      <div>Visualizer</div>
      <Button
        onClick={start}
      >
        click
      </Button>
      {curr}
    </div>
  )
}

export default Visualizer;

