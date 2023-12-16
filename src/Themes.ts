import { createTheme } from "@mui/material"
import background from './assets/background.jpg'
import road from './assets/road.png'

declare module '@mui/material/styles' {
  interface Theme {
    id: string
  }

  interface ThemeOptions {
    id: string
  }

  interface TypeText {
    header: string
  }
}

let light = createTheme({
  id: 'light',
  typography: {
    fontFamily: [
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#2c599d',
      light: '#5b84c4',
      dark: '#193a6f'
    },
    text: {
      header: '#fff'
    },
    background: {
      default: '#f98125'
    },
    mode: 'light'
  }
})

let dark = createTheme({
  id: 'dark',
  typography: {
    fontFamily: [
      'sans-serif',
    ].join(','),
  },
  palette: {
    text: {
      header: '#fff'
    },
    mode: 'dark'
  }
})

let meme = createTheme({
  id: 'meme',
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: `url(${road})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `url(${background})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }
      }
    }
  },
  typography: {
    fontFamily: [
      'sans-serif',
    ].join(','),
  },
  palette: {
    text: {
      header: '#fff'
    },
    mode: 'dark'
  }
})

let Themes = [
  light,
  dark,
  meme
]

export default Themes;
