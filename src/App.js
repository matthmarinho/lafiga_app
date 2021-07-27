import React from 'react'
import { useEffect, useState } from "react";
import NavBar from './screens/NavBar/NavBar'
import ImageMap from './screens/ImageMap/ImageMap'
import Home from './screens/Home/Home'
import { createTheme, ThemeProvider } from "@material-ui/core";
import './index.css'
import LoginModal from './screens/Login/LoginModal'


const theme = createTheme({
  palette: {
    type: "dark"
  }
});

function App() {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(prev => !prev)
  }

  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}

export default App;