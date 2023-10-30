import "../components/register.css";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import RoomIcon from '@mui/icons-material/Room';


const Register = ({setShowRegister , setShowInstruction}) => {
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        setShowRegister(false)
        setShowInstruction(true)
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };
  const handleClose =()=>{
    setShowRegister(false)
  }

  return (
    <div className="registerContainer">
      <div className="logo">
      <RoomIcon />
        MyPlaceKeeper
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <input style={{height:'18.5px',width:'240px'}}
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

        {error &&
          <span className="failure">
            Something Went Wrong!!!!
          </span>}
      </form>
      <CloseIcon className="registerCancel" onClick={handleClose}  />

    </div>
  )
}

export default Register