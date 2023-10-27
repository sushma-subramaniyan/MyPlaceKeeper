import "../components/login.css"
import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import CloseIcon from '@mui/icons-material/Close';
import RoomIcon from '@mui/icons-material/Room';


const Login = ({setShowLogin}) => {
    
    const [error, setError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { login } = useContext(AuthContext)
   
    const handleSubmit =async (e)=>{
        e.preventDefault();
        const newUser = {
            username,
            password,
        };
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(newUser),
            headers:{
                'Content-type':'application/json',
            },
          }
          );
          if (response.status === 400) {
            const parsed = await response.json()
            throw new Error(parsed.message)
          }
          if (response.status === 200) {
            const parsed = await response.json()
            login(parsed.token)
            setError(false);
            setShowLogin(false)
          }
           
        } catch (error) {
          console.log(error )
           setError(true); 
        }
    };
    const handleClose =()=>{
      setShowLogin(false)
    }
    
    return (
      
     <div className="loginContainer">
        <div className="logo">
        <RoomIcon />
            MyPlaceKeeper
        </div>
        <form onSubmit={handleSubmit}>
            <label>
            <input style={{height:'18.5px',width:'240px'}} value={username} placeholder="username" onChange={event=>setUsername(event.target.value)} required/>
            </label>
            <input value={password} type="password" placeholder="password" onChange={event=>setPassword(event.target.value)} required/>
            <button className="loginBtn">Login</button>
        
             { error && 
             <span className="failure">
                Something Went Wrong!!!!
            </span>}
           
            
        </form>
        <CloseIcon className="loginCancel"  onClick={handleClose}/>
        
       
     </div>
     
    )
  }
  
  export default Login