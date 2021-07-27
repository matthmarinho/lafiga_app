import React from 'react'
import Home from './screens/Home/Home'
import { createTheme, ThemeProvider } from "@material-ui/core";
import './index.css'
import { red } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: red[500],
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