import { createTheme } from "@mui/material"
import background from './assets//background.jpg'

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
    text: {
      header: '#fff'
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
