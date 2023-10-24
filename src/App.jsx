import { useState } from 'react'
import Map, { Marker } from 'react-map-gl';
import * as React from 'react';
import "./app.css";




function App() {
  const [viewState, setViewState] = React.useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5
  });
 

  return (
    <div className="App">
   <Map
      {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{width: "100vw", height: "100vh"}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX}
    >
      <Marker 
      longitude={2.294694} 
      latitude={48.858093} 
      offsetLeft={-20} 
      offsetTop={-10}>
      <div>You ARE HERE</div>
        </Marker>
    </Map>
    </div>
      
  )
}

export default App
