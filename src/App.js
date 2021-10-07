import React from 'react'
import Home from './screens/Home/Home'
import Map from './components/Map/index'
import Layout from './components/Layout/Layout'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import darkScrollbar from '@mui/material/darkScrollbar'
import { isBrowser } from 'react-device-detect'
import './index.css'

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#e65100',
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: isBrowser ? darkScrollbar({ track: '#121212', thumb: '#6b6b6b', active: '#959595' }) : null,
      },
    },
  },
});

function App() {
  console.log(isBrowser)
  return (
    <ThemeProvider theme={theme}>
      {/* <Map /> */}
      <Layout />
    </ThemeProvider>
  );
}

export default App;