import React from 'react'
import Home from './screens/Home/Home'
import { createTheme, ThemeProvider } from "@material-ui/core";
import './index.css'

const theme = createTheme({
  palette: {
    type: "dark"
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