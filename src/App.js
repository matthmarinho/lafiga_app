import React from 'react'
import Home from './screens/Home/Home'
import { createTheme, ThemeProvider } from '@mui/material/styles'
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
  }
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;