import React from 'react'
import { useEffect, useState } from "react";
import NavBar from './screens/NavBar/NavBar'
import ImageMap from './screens/ImageMap/ImageMap'
import './index.css'
import LoginModal from './screens/Login/LoginModal'


const theme = {
  global: {
    colors: {
      brand: '#000000',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '0px',
    },
  },
  header: {
    marginLeft: '12px',
  }
};

function App() {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(prev => !prev)
  }

  return (
    <React.Fragment>
      <div>
      <LoginModal showModal={showModal} setShowModal={setShowModal}/>
        <div class={showModal ? "absolute inset-0 z-40 opacity-50 pg-black pointer-events-none" : "flex"}>
          <NavBar openModal={openModal}/>
          <div class="w-full overflow-x-hidden flex flex-col">
            <ImageMap />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;