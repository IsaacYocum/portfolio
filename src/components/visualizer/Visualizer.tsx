import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import './Visualizer.css'
import CSS from 'csstype'

let Visualizer = () => {
  const theme = useTheme();
  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  let [target, setTarget] = useState<number>(testArray[1]);

  interface DataStructure {
    id: string,
    label: string,
    value: string,
    algorithms: Algorithm[],
  }

  interface Algorithm {
    id: string,
    label: string,
    value: string,
    run: (arr?: number[], tar?: number) => void,
    targetRequired: boolean
  }

  let iterateArray: Algorithm = {
    id: 'iterate',
    label: 'Iterate',
    value: 'iterate',
    run: () => iterate(testArray),
    targetRequired: false,
  }

  let binarySearchAlg: Algorithm = {
    id: 'binarySearch',
    label: 'Binary Search',
    value: 'binarySearch',
    run: (_, tar?: number) => binarySearch(testArray, target || 0),
    targetRequired: true,
  }

  let binaryTreeSearch: Algorithm = {
    id: 'binaryTreeSearch',
    label: 'Binary Tree Search',
    value: 'binaryTreeSearch',
    run: () => { },
    targetRequired: true,
  }


  let array: DataStructure = {
    id: 'array',
    label: 'Array',
    value: 'array',
    algorithms: [
      iterateArray,
      binarySearchAlg,
    ]
  }

  let binaryTree: DataStructure = {
    id: 'binaryTree',
    label: 'Binary Tree',
    value: 'Binary Tree',
    algorithms: [
      binaryTreeSearch,
    ]
  }

  let dataStructures = [
    array,
    binaryTree
  ]

  let [min, setMin] = useState(0);
  let [max, setMax] = useState(0);
  let [curr, setCurr] = useState(0);
  let [dataStructure, setDataStructure] = useState<DataStructure>(array);
  let [algorithm, setAlgorithm] = useState<Algorithm>(array.algorithms[0]);

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

  let handleStart = () => {
    //iterate(testArray);
    setCurr(0);
    setMin(0);
    setMax(0);
    algorithm.run()
  };

  async function iterate(arr: Array<number>) {
    for (let i = 0; i < arr.length; i++) {
      setCurr(arr[i]);
      await delay(1000);
    }
  };

  let binarySearch = async (arr: Array<number> = testArray, tar: number) => {
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
      if (arr[mid] === tar) break;

      if (arr[mid] < tar) {
        beg = mid + 1;
        setMin(arr[beg]);
        await delay(2000);
      }

      if (arr[mid] > tar) {
        end = mid - 1;
        setMax(arr[end]);
        await delay(2000);
      }

    }
  };

  let getNodeStyle = (i: number) => {
    let colors = []
    let style: CSS.Properties = {
      height: '50px',
      width: '50px',
      transition: 'all .5s linear',
      WebkitTransition: 'all .5s linear',
      color: 'black',
      padding: '10px',
      margin: '10px',
      borderRadius: '10',
      textAlign: 'center'
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

  // let handleChangeTarget = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const re = /^[0-9\b]+$/;
  //   let value = event.target.value;
  //
  //   if (value === '') {
  //     setTarget(value)
  //     setError('Must be a number')
  //   } else if (re.test(value)) {
  //     if (testArray.includes(parseInt(value))) {
  //       setTarget(value)
  //       setError('')
  //     } else {
  //       setTarget(value)
  //       setError('Target must be in array')
  //     }
  //   } else {
  //     setError('Must be a number')
  //   }
  // }

  let handleDataStructureSelectChange = (event: SelectChangeEvent<string>) => {
    let ds = dataStructures.find(d => d.value === event.target.value) || array;
    setDataStructure(ds);
    setAlgorithm(ds?.algorithms[0]);
  }

  let handleAlgorithmSelectChange = (event: SelectChangeEvent<string>) => {
    let ag = dataStructure?.algorithms.find(a => a.value === event.target.value) || dataStructure?.algorithms[0];
    setAlgorithm(ag);
  }

  let handleSelectTargetChange = (event: SelectChangeEvent<number>) => {
    let value = event.target.value;
    setTarget(value as number);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={4}>
          <FormControl fullWidth margin="normal">
            <InputLabel id='dataStructureLabel'>Data Structure</InputLabel>
            <Select
              id='dataStructureSelect'
              labelId='dataStructureLabel'
              value={dataStructure?.value}
              label='Data Structure'
              onChange={handleDataStructureSelectChange}
            >
              {dataStructures.map(dataStructure => <MenuItem key={dataStructure.id} value={dataStructure.value}>{dataStructure.label}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id='algorithmLabel'>Algorithm</InputLabel>
            <Select
              id='algorithmSelect'
              labelId='algorithmLabel'
              value={algorithm?.value}
              label='Algorithm'
              onChange={handleAlgorithmSelectChange}
            >
              {dataStructure?.algorithms?.map(algorithm => <MenuItem key={algorithm.id} value={algorithm.value}>{algorithm.label}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id='targetLabel'>Target</InputLabel>
            <Select
              id='targetSelect'
              labelId='targetLabel'
              value={target}
              label='Target'
              disabled={!algorithm.targetRequired}
              onChange={handleSelectTargetChange}
            >
              {testArray.map(i => <MenuItem key={i} value={i}>{i}</MenuItem>)}
            </Select>
          </FormControl>
          <Button
            onClick={handleStart}
            variant='contained'
          >
            Start
          </Button>

          {/* <Settings */}
          {/*   handleStart={handleStart} */}
          {/*   target={target} */}
          {/*   error={error} */}
          {/*   handleChangeTarget={handleChangeTarget} */}
          {/* /> */}
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6">Visualizer</Typography>
          <hr />
          <div className='flexContainer'>
            {testArray.map(i => <div key={'node' + i} style={getNodeStyle(i)}>{i}</div>)}
          </div>
        </Grid>
      </Grid >
    </Box >
  )
}

export default Visualizer;

