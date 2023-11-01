import "../components/register.css";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import RoomIcon from '@mui/icons-material/Room';
import { Backdrop, CircularProgress } from "@mui/material";


const Register = ({ setOpenSnakbar, setShowComponent }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const resetForm = () => {
    setUsername("")
    setEmail("")
    setPassword("")
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenBackdrop(true);
    const newUser = {
      username,
      email,
      password,
    };
    try {
      console.log(newUser)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      if (response.ok) {
        setShowComponent({ instruction: true, register: false })
        setOpenBackdrop(false);
        setOpenSnakbar({ open: true, message: 'User created successfully', severity: 'success' })
      } else {
        const parsed = await response.json()
        setOpenBackdrop(false);
        setOpenSnakbar({ open: true, message: parsed.message, severity: 'error' })
        resetForm()
      }
    } catch (error) {
      setOpenBackdrop(false);
      setOpenSnakbar({ open: true, message: error.message, severity: 'error' })
      resetForm()
    }
  };

  const handleClose = () => {
    setShowComponent({register: false})
  }

  return (
    <div className="registerContainer">
      <div className="logo">
        <RoomIcon />
        MyPlaceKeeper
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <input style={{ height: '18.5px', width: '240px' }}
            value={username}
            placeholder="username"
            onChange={event => setUsername(event.target.value)}
            required />
        </label>
        <input
          value={email}
          placeholder="email"
          onChange={event => setEmail(event.target.value)}
          required />
        <input
          value={password}
          type="password"
          placeholder="password"
          onChange={event => setPassword(event.target.value)}
          required />
        <button className="registerBtn">Register</button>
      </form>
      <CloseIcon className="registerCancel" onClick={handleClose} />

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

export default Register