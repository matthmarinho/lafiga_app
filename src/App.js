import React from 'react'
import Layout from './components/Layout/Layout'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout />
    </ThemeProvider>
  );
}

export default App;