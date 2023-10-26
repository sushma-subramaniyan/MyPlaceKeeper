import "../components/register.css";
import { useState } from "react";
import CancelIcon from '@mui/icons-material/Cancel';


const Register = () => {
  const [success, setSuccess] = useState(false)
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
        setError(false);
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className="registerContainer">
      <div className="logo">
        { /*/have to giv pin */}
        LamaPin
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            value={username}
            placeholder="usernmae"
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

        {success && (
          <span className="success">
            Successfull.You can Login Now!
          </span>
        )}
        {error &&
          <span className="failure">
            Something Went Wrong!!!!
          </span>}
      </form>
      <CancelIcon />

    </div>
  )
}

export default Register