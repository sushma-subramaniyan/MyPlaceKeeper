import React, { useState, useEffect } from 'react';
import { Marker, Popup, Map } from 'react-map-gl';
import './homePage.css';
import StarIcon from '@mui/icons-material/Star';
import RoomIcon from '@mui/icons-material/Room';
import { format } from 'timeago.js';
import Register from '../components/Register';
import { useContext } from 'react';
import Login from '../components/Login';
import Instructions from '../components/Instructions'
import { AuthContext } from '../contexts/AuthContext';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Rating } from '@mui/material';



function HomePage() {
  const { user, logout } = useContext(AuthContext)
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [rating, setRating] = useState(0);
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [viewState, setViewState] = useState({
    latitude: 48,
    longitude: 17,
    zoom: 5,
  });
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [openSnakbar, setOpenSnakbar] = useState({
    open:false,
    message: '',
    severity: 'success', // 'error' | 'warning' | 'info' | 'success'
  }
  )
  const [showInstruction, setShowInstruction] = useState(false);
  const [showNewPlacePopup, setShowNewPlacePopup] = useState(null);

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
        setNewPlace(null);
        setTitle('')
        setDesc('')
        setRating(1)
        setPins((prevPins) => prevPins.filter((pin) => pin._id !== placeId));
      } else {
        console.log("Error deleting pin");
      }
    } catch (error) {
      console.log("Error deleting pin:", error);
    }
  };


  const handleMarkerClick = (id, lat, lng) => {
    const selectedPin = pins.find(pin => pin._id === id)
    // console.log(selectedPin)
   
    if (selectedPin.username === user?.username) {
      setTitle(selectedPin.title)
      setDesc(selectedPin.desc)
      setRating(selectedPin.rating)
      setNewPlace({
        lng,
        lat,
        edit: true,
        id,
      });
      setShowNewPlacePopup (true);
      setCurrentPlaceId(null);
    } else {
      setCurrentPlaceId(id);
      setViewState({ ...viewState, latitude: lat, longitude: lng })
      setShowNewPlacePopup(false);
    }

  };

  const handleAddClick = (event) => {
    if (user) {
      const { lng, lat } = event.lngLat;
      setNewPlace({
        lng,
        lat,
        edit: false,
      });
      setShowNewPlacePopup (true);
      setCurrentPlaceId(null);
      setTitle('')
      setDesc('')
      setRating(1)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = newPlace.edit ? 'PUT' : 'POST'
    const pindId = newPlace.edit ? '/' + newPlace.id : '';
    const newPin = {
      username: user.username,
      title,
      desc,
      rating: rating,
      lat: newPlace.lat,
      long: newPlace.lng,
    };

    console.log(pindId);
    try {


      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pins${pindId}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPin),
      });

      if (response.ok) {
        const data = await response.json();
        if (newPlace.edit) {


          setPins((prevPins) =>
            prevPins.map((pin) => (pin._id === newPlace.id ? data : pin))
          );
        } else {


          setPins([...pins, data]);
        }
        setTitle('')
        setDesc('')
        setRating(1)
        setNewPlace(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setTitle('')
    setDesc('')
    setRating(1)
    setNewPlace(null);
    setCurrentPlaceId(null)
    logout();
    setShowNewPlacePopup(false);
    
  };



  return (
    <div className="App">
      <Map
        {...viewState}
        // onContextMenu={handleAddClick}
        onMove={evt => setViewState(evt.viewState)}
        doubleClickZoom={false}
        style={{ height: '100vh',transitionDuration: '2s' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX}
        onDblClick={handleAddClick}
      
        
      // transitionDuration="5000000" its not working
      >
 
        { pins.map((p) => (
          <Marker
            longitude={p.long}
            latitude={p.lat}
            anchor="bottom"
            key={p._id}
            style={{ zIndex: '20' }}
            onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
          >


            <RoomIcon
              style={{
                fontSize: viewState.zoom * 7,
                color: p.username === user?.username ? "tomato" : "slateblue",
                cursor: "pointer",

              }}
              onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
            />
          </Marker>
        ))}
      

        {pins.map((p) => (
          currentPlaceId === p._id  && (
            <Popup
              key={p._id}
              longitude={p.long}
              latitude={p.lat}
              anchor="top"
              closeButton={true}
              closeOnClick={false}
              onClose={() => setCurrentPlaceId(null)}
              className="popup"
            >
              <div>
               <div className='card'>
                <label className='labelplace'>Place</label>
                <p className="place">{p.title}</p>
                <label className='labelReview'>Review</label>
                <p className="desc">{p.desc}</p>
                <label className='labelRating'>Rating</label>
             
                <div className='star'>
                  {Array(p.rating).fill(0).map((_, index) => (
                    <StarIcon key={index} className='star' />
                  ))}

                </div>
                <label className='labelInfo'>Created By</label>
                <span className="username">
                  {p.username}
                </span>
                <span className="date">{format(p.createdAt)}</span>
              </div>
           </div>
            </Popup>
          )
        ))}
        {showNewPlacePopup && newPlace && (
          <Popup
            className='popup'
            longitude={newPlace.lng}
            latitude={newPlace.lat}
            anchor="top"
            closeButton={true}
            closeOnClick={false}
            onClose={() => {
              setNewPlace(null);
              setTitle('');    
              setDesc('');     
              setRating(1);    
            }}>

            <div>
                <form onSubmit={handleSubmit} className='form'>
                <label className='title'>Place</label>
                <input
                  placeholder="Enter a title"
                  autoFocus
                  value={title}
                  spellCheck={false}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label className='Description'>Review</label>
                <textarea
                  style={{resize:'none'}}
                  rows={3}
                  spellCheck={false}
                  placeholder="Say us something about this place."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label className='newRating'>Rating</label>
                <Rating
                  name="your-rating"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
                {newPlace.edit ? (
                  <>
                    <button type="submit" className="submitButton">
                      Update Pin
                    </button>
                    <button type="button" onClick={() => handleDelete(newPlace.id)} className="submitButton">
                      Delete Pin
                    </button>
                  </>
                ) : (
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                )}
              </form>
            </div>
          </Popup >

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
                setShowRegister(false)

                setShowNewPlacePopup(false); 
                setCurrentPlaceId(null);
              }
              }
            >
              Log in
            </button>
            <button
              className="button register"
              onClick={() => {
                setShowNewPlacePopup(false); 
                setCurrentPlaceId(null);
                setShowLogin(false)
                setShowRegister(true)
              }
              }
            >
              Register
            </button>
          </div>
        )}
        {showRegister && 
          <Register 
            setShowRegister={setShowRegister} 
            setShowInstruction={setShowInstruction}
            setOpenSnakbar={setOpenSnakbar} 
          />}

        {showLogin && 
          <Login 
            setShowLogin={setShowLogin} 
            setOpenSnakbar={setOpenSnakbar} 
          />
        }

        <Snackbar 
          open={openSnakbar.open} 
          autoHideDuration={3000}
          onClose={() => setOpenSnakbar({open: false, message: ''})}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
          <MuiAlert elevation={6} variant="filled" severity={openSnakbar.severity} sx={{ width: '100%' }}>
            {openSnakbar.message}
          </MuiAlert>
        </Snackbar>
        {showInstruction && <Instructions setShowLogin={setShowLogin} setShowInstruction={setShowInstruction}/>}
      </Map>
    </div>
  );
}

export default HomePage;