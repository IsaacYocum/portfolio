import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from '@mui/material';
import CSS from 'csstype';
import { useState } from 'react';
import './Visualizer.css';

const Visualizer = () => {
  const theme = useTheme();
  const testArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  let [target, setTarget] = useState<number>(testArray[1]);

  interface DataStructure {
    id: string;
    label: string;
    value: string;
    algorithms: Algorithm[];
  }

  interface Algorithm {
    id: string;
    label: string;
    value: string;
    run: (arr?: number[], tar?: number) => void;
    targetRequired: boolean;
  }

  const iterateArray: Algorithm = {
    id: 'iterate',
    label: 'Iterate',
    value: 'iterate',
    run: () => iterate(testArray),
    targetRequired: false,
  };

  const binarySearchAlg: Algorithm = {
    id: 'binarySearch',
    label: 'Binary Search',
    value: 'binarySearch',
    run: (_, tar?: number) => binarySearch(target || 0, testArray),
    targetRequired: true,
  };

  const binaryTreeSearch: Algorithm = {
    id: 'binaryTreeSearch',
    label: 'Binary Tree Search',
    value: 'binaryTreeSearch',
    run: () => {},
    targetRequired: true,
  };

  const array: DataStructure = {
    id: 'array',
    label: 'Array',
    value: 'array',
    algorithms: [iterateArray, binarySearchAlg],
  };

  const binaryTree: DataStructure = {
    id: 'binaryTree',
    label: 'Binary Tree',
    value: 'Binary Tree',
    algorithms: [binaryTreeSearch],
  };

  const dataStructures = [array, binaryTree];

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [curr, setCurr] = useState(0);
  const [dataStructure, setDataStructure] = useState<DataStructure>(array);
  const [algorithm, setAlgorithm] = useState<Algorithm>(array.algorithms[0]);

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handleStart = () => {
    setCurr(0);
    setMin(0);
    setMax(0);
    algorithm.run();
  };

  function iterate(arr: Array<number>) {
    (async () => {
      for (const element of arr) {
        setCurr(element);
        await delay(1000);
      }
    })();
  }

  const binarySearch = (tar: number, arr: Array<number> = testArray) => {
    (async () => {
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
    })();
  };

  const getNodeStyle = (i: number) => {
    let colors = [];
    let style: CSS.Properties = {
      height: '50px',
      width: '50px',
      transition: 'all .5s linear',
      WebkitTransition: 'all .5s linear',
      color: 'black',
      padding: '10px',
      margin: '10px',
      borderRadius: '10',
      textAlign: 'center',
    };

    if (i === min) {
      colors.push('blue');
    }

    if (i === curr) {
      colors.push('green');
    }

    if (i === max) {
      colors.push('red');
    }

    if (colors.length === 0) {
      style.background = theme.palette.secondary.light;
    }

    if (colors.length > 0) {
      style.color = 'gold';
    }

    if (colors.length === 1) {
      style.background = colors[0];
    }

    if (colors.length > 1) {
      let gradientPercent = 100 / colors.length;
      if (gradientPercent <= 100) {
        let gradient = colors.map(
          (color, i) =>
            `${
              color +
              ' ' +
              gradientPercent * i +
              '% ' +
              gradientPercent * (i + 1)
            }%`
        );
        style.background = `linear-gradient(45deg, ${gradient})`;
      }
    }

    return style;
  };

  const handleDataStructureSelectChange = (
    event: SelectChangeEvent<string>
  ) => {
    let ds =
      dataStructures.find((d) => d.value === event.target.value) || array;
    setDataStructure(ds);
    setAlgorithm(ds?.algorithms[0]);
  };

  const handleAlgorithmSelectChange = (event: SelectChangeEvent<string>) => {
    let ag =
      dataStructure?.algorithms.find((a) => a.value === event.target.value) ||
      dataStructure?.algorithms[0];
    setAlgorithm(ag);
  };

  const handleSelectTargetChange = (event: SelectChangeEvent<number>) => {
    let value = event.target.value;
    setTarget(value as number);
  };

  return (
    <>
      <Typography variant="h3">Visualizer</Typography>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={4}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="dataStructureLabel">Data Structure</InputLabel>
            <Select
              id="dataStructureSelect"
              labelId="dataStructureLabel"
              value={dataStructure?.value}
              label="Data Structure"
              onChange={handleDataStructureSelectChange}
            >
              {dataStructures.map((dataStructure) => (
                <MenuItem key={dataStructure.id} value={dataStructure.value}>
                  {dataStructure.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="algorithmLabel">Algorithm</InputLabel>
            <Select
              id="algorithmSelect"
              labelId="algorithmLabel"
              value={algorithm?.value}
              label="Algorithm"
              onChange={handleAlgorithmSelectChange}
            >
              {dataStructure?.algorithms?.map((algorithm) => (
                <MenuItem key={algorithm.id} value={algorithm.value}>
                  {algorithm.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="targetLabel">Target</InputLabel>
            <Select
              id="targetSelect"
              labelId="targetLabel"
              value={target}
              label="Target"
              disabled={!algorithm.targetRequired}
              onChange={handleSelectTargetChange}
            >
              {testArray.map((i) => (
                <MenuItem key={i} value={i}>
                  {i}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={handleStart} variant="contained">
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
          <div className="flexContainer">
            {testArray.map((i) => (
              <div key={'node' + i} style={getNodeStyle(i)}>
                {i}
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Visualizer;
