import { createTheme } from "@mui/material/styles"
import background from './assets/background.jpg'
import road from './assets/road.png'
import { blue, blueGrey, lightBlue } from "@mui/material/colors"

export enum ThemeName {
  Light = 'LIGHT',
  Dark = 'DARK',
  Meme = 'MEME',
}

declare module '@mui/material/styles' {
  interface Theme {
    id: ThemeName,
  }

  interface ThemeOptions {
    id: string,
  }

  interface TypeText {
    header: string,
    footer: string,
  }

  interface TypeBackground {
    header: string,
    footer: string,
  }
}

let light = createTheme({
  id: ThemeName.Light,
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
      header: '#fff',
      footer: '#fff'
    },
    background: {
      default: '#f98125',
      header: '#2c599d',
      footer: '#2c599d'
    },
    mode: 'light'
  }
})

let dark = createTheme({
  id: ThemeName.Dark,
  typography: {
    fontFamily: [
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#01051c',
      paper: '#080f36'
    },
    text: {

    },
    mode: 'dark'
  }
})

let meme = createTheme({
  id: ThemeName.Meme,
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
      header: '#fff',
      footer: '#fff'
    },
    background: {
      header: '#282828',
      footer: '#363636'
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
