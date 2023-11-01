import "../components/login.css"
import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import CloseIcon from '@mui/icons-material/Close';
import RoomIcon from '@mui/icons-material/Room';
import { Backdrop, CircularProgress } from "@mui/material";


const Login = ({ setShowComponent , setOpenSnakbar}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);


  const { login } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenBackdrop(true)
    const newUser = {
      username,
      password,
    };
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            'Content-type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        const parsed = await response.json()
        login(parsed.token)
        setOpenBackdrop(false)
        setShowComponent({login:false})
        setOpenSnakbar({ open: true, message: 'Logged in successfully', severity: 'success' })
      } else {
        const parsed = await response.json()
        setOpenBackdrop(false)
        setOpenSnakbar({ open: true, message: parsed.message, severity: 'error' })
      }

    } catch (error) {
      console.log(error)
      setOpenBackdrop(false)
      setOpenSnakbar({ open: true, message: 'Something went wrong', severity: 'error' })
    }
  };

  const handleClose = () => {
    setShowComponent({login:false})
  }

  return (

    <div className="loginContainer">
      <div className="logo">
        <RoomIcon />
        MyPlaceKeeper
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <input style={{ height: '18.5px', width: '240px' }} value={username} placeholder="username" onChange={event => setUsername(event.target.value)} required />
        </label>
        <input value={password} type="password" placeholder="password" onChange={event => setPassword(event.target.value)} required />
        <button className="loginBtn">Login</button>
      </form>
      <CloseIcon className="loginCancel" onClick={handleClose} />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

    </div>

  )
}

export default Login
