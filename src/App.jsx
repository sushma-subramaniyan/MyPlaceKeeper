import { useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl';
import * as React from 'react';
import "./app.css";
import Pin from './Pin.jsx'
import { Rating } from '@mui/material';




function App() {
  const [value, setValue] = React.useState(2);
  const [viewState, setViewState] = React.useState({
    longitude: 17,
    latitude: 46,
    zoom: 4,
       });
       const [showPopup, setShowPopup] = useState(true);


  return (
    <div className="App">
      <Map
       initialViewState={{
        ...viewState
      }}
        onMove={evt => setViewState(evt.viewState)}
        style={{ height:"100vh"}}
        mapStyle='mapbox://styles/mapbox/streets-v12'
        mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX}
      >

        <Marker
          longitude={2.349014}
          latitude={48.864716}
          anchor="bottom">
          <Pin />
        </Marker>

        {showPopup && (
      <Popup 
      longitude={2.349014} 
      latitude={48.864716}
        anchor="bottom"
        closeButton={true}
        closeOnClick={false}      
        >
        <div className='card'>
          <label>Place</label>
          <h4 className='place'>EffileTower</h4>
          <label>Review</label>
          <p>Beatufil place</p>
          <label>Rating</label>
               
          <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }} 
          />
          <label>Image</label>
          <label>Information</label>
          

        </div>
      </Popup>)}
      </Map>
    </div>

  )
}

export default App
