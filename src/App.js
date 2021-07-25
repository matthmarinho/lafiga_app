import React from 'react'
import NavBar from './screens/NavBar/NavBar'
import ImageMap from './screens/ImageMap/ImageMap'
import './index.css'

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
  return (
    <React.Fragment>
      <div class="flex">
        <NavBar />
        <div class="w-full overflow-x-hidden flex flex-col">
          <ImageMap />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;