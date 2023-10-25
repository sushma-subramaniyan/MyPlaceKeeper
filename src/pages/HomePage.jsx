import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import './homePage.css';
import StarIcon from '@mui/icons-material/Star';
import RoomIcon from '@mui/icons-material/Room';
import { format } from 'timeago.js';
import Register from '../components/Register';


function HomePage() {
    const currentUser = "Sanjana"
    const [pins, setPins] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [newPlace, setNewPlace] = useState(null);
    const [viewport, setViewport] = useState({
      latitude: 46,
      longitude: 17,
      zoom: 2,
    });
    const [showPopup, setShowPopup] = useState(true);
  
    useEffect(() => {
      const fetchPins = async () => {
        try {
          const response = await fetch('http://localhost:5005/api/pins');
          if (response.ok) {
            const data = await response.json();
            setPins(data);
          } else {
            console.log('Failed to fetch data');
          }
        } catch (error) {
          console.log('Error:', error);
        }
      };
      fetchPins();
    }, []);
  
    const handleMarkerClick = (id) => {
      setCurrentPlaceId(id);
    };

    const handleAddClick = (event) =>{
      console.log(event);
           const [long,lat]= event.lngLat;
           setNewPlace({
            long,
            lat,
           });
    };

    return ( 
        <div className="App">
        <Map
          {...viewport}               
          onMove={(evt) => setViewport(evt.viewport)}
          style={{ height: '100vh' }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX}
          onDoublClick={handleAddClick} 
          >


          {pins.map((p) => (
            <Marker 
            longitude={p.long} 
            latitude={p.lat} 
            anchor="bottom" 
            key={p._id}>

              <RoomIcon
                style={{
                  color: p.username===currentUser ? "tomato" : "slateblue",
                  cursor: "pointer",
                }}
                onClick={()=>handleMarkerClick(p._id)}
              />
            </Marker>
          ))}
  
          {pins.map((p) => (
            currentPlaceId === p._id && showPopup && (
              <Popup
                longitude={p.long}
                latitude={p.lat}
                anchor="top"
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                key={p._id}
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="desc">{p.desc}</p>
                  <label>Rating</label>
                  <div className='star'>
                    <StarIcon className='star' />
                    <StarIcon className='star' />
                    <StarIcon className='star' />
                    <StarIcon className='star' />
                    <StarIcon className='star' />
                  </div>
                  <label>Information</label>
                  <span className="username">
                    {p.username}
                  </span>
                </div>
                <span className="date">{format(p.createdAt)}</span>
              </Popup>
            )
          ))}
          {newPlace &&  (
         <Popup
   
                longitude={newPlace.long}
                latitude={newPlace.lat}
                anchor="top"
                closeButton={true}
                closeOnClick={false}
                onClose={() => setnewPlace(null)}
               >hello</Popup> )}
        </Map>
      </div>
     );
}

export default HomePage;