import React, { useState, useEffect } from 'react';
import {  Marker, Popup, Map } from 'react-map-gl';
import './homePage.css';
import StarIcon from '@mui/icons-material/Star';
import RoomIcon from '@mui/icons-material/Room';
import { format } from 'timeago.js';
import Register from '../components/Register';
import { useContext } from 'react';
import Login from '../components/Login';
import { AuthContext } from '../contexts/AuthContext';


function HomePage() {
  const { user, logout } = useContext(AuthContext)
  const myStorage = window.localStorage;
  //const [currentUsername, setCurrentUsername] = useState(myStorage.getItem("user"));
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [star, setStar] = useState(0);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 48,
    longitude: 17,
    zoom: 5,
  });
  const [showPopupEdit, setShowPopupEdit] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pins`);
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

  const handleDelete = async (placeId) => {
    try {
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pins/${placeId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        console.log('deleted')
        setPins((prevPins) => prevPins.filter((pin) => pin._id !== placeId));
       
        setCurrentPlaceId(null);
      } else {
        console.error("Error deleting pin");
      }
    } catch (error) {
      console.error("Error deleting pin:", error);
    }
  };


  const handleMarkerClick = (id, lat, long) => {
    const selectetPin = pins.filter(pin => pin._id === id)
    if(selectetPin[0].username === user.username){
      setShowPopupEdit(true)
      setViewport({ ...viewport, latitude: lat, longitude: long })
    } else {
      console.log(id, lat, long)
      setCurrentPlaceId(id);
      setViewport({ ...viewport, latitude: lat, longitude: long })
    }

  };

  const handleAddClick = (event) => {
    if(user) {
      const { lng, lat } = event.lngLat;
      setNewPlace({
        lng,
        lat,
      });
    }
  };

  const handlemove = (evt) => {
    // console.log(evt)
    const zoom = evt.viewState.zoom
    const newlat = evt.viewState.latitude
    const newlng = evt.viewState.longitude
    setViewport({ zoom, latitude: newlat, longitude: newlng })
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: user.username,
      title,
      desc,
      rating: star,
      lat: newPlace.lat,
      long: newPlace.lng,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pins`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPin),
      });
  
      if (response.ok) {
  
      const data = await response.json();
      setPins([...pins, data]);
      setNewPlace(null);
    }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="App">
      <Map
        {...viewport}
        onContextMenu={handleAddClick}
        onMove={handlemove}
        style={{ height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX}
        // doubleClickZoom={false}
        // transitionDuration="5000000" its not working
      >


        {pins.map((p) => (
          <Marker
            longitude={p.long}
            latitude={p.lat}
            anchor="bottom"
            key={p._id}
            style={{zIndex:'20'}}
            >


            <RoomIcon
              style={{
                fontSize: viewport.zoom * 7,
                color: p.username === user?.username ? "tomato" : "slateblue",
                cursor: "pointer",
              }}
              onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
            />
          </Marker>
        ))}

        {pins.map((p) => (
          currentPlaceId === p._id &&  (
            <Popup
              key={p._id}
              longitude={p.long}
              latitude={p.lat}
              anchor="top"
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
            >
              <div className="card">
                <label>Place</label>
                <h4 className="place">{p.title}</h4>
                <label>Review</label>
                <p className="desc">{p.desc}</p>
                <label>Rating</label>
                <div className='star'>
                 {Array(p.rating).fill( <StarIcon className='star' />)}
                  
                </div>
                <label>Information</label>
                <span className="username">
                  {p.username}
                </span>
              </div>
              <span className="date">{format(p.createdAt)}</span>
              {user && p.username === user.username && (
                <button onClick={() => handleDelete(p._id)}>Delete</button>
              )}
           
            </Popup>
          )
        ))}
        {newPlace && (
          <Popup
            longitude={newPlace.lng}
            latitude={newPlace.lat}
            anchor="top"
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}>

            <div>
              <form onSubmit={handleSubmit} >
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Description</label>
                <textarea
                  placeholder="Say us something about this place."
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setStar(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button type="submit" className="submitButton">
                  Add Pin
                </button>
                {/* <button  className="deleteButton" onClick={handleDelete}>
                  delete
                </button> */}
              </form>
            </div>
          </Popup>
        )}
         {showPopupEdit && (
          <Popup
            longitude={newPlace.lng}
            latitude={newPlace.lat}
            anchor="top"
            closeButton={true}
            closeOnClick={false}
            onClose={() => showPopupEdit(false)}>

            <div>
              <form onSubmit={handleSubmit} >
                <label>Title</label>
                <input
                  placeholder="Enter a title"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Description</label>
                <textarea
                  placeholder="Say us something about this place."
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setStar(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button type="submit" className="submitButton">
                  Add Pin
                </button>
                {/* <button  className="deleteButton" onClick={handleDelete}>
                  delete
                </button> */}
              </form>
            </div>
          </Popup>
        )}
          {user ? (
          <button className="button logout" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <div className="buttons">
            <button 
              className="button login" 
              onClick={() => {
                setShowLogin(true)
                setShowRegister(false)}
              }
            >
              Log in
            </button>
            <button
              className="button register"
              onClick={() => {
                setShowLogin(false)
                setShowRegister(true)}
              }
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} setShowLogin={setShowLogin} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            // setCurrentUser={setCurrentUser}
            // myStorage={myStorage}
          />
        )} 
      </Map>
    </div>
  );
}

export default HomePage;