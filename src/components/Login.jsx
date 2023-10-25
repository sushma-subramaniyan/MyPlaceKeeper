import "../components/login.css"
import { useState } from "react";


const Login = () => {
    
    const [error, setError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
   
    const handleSubmit =async (e)=>{
        e.preventDefault();
        const user = {
            username,
            password,
        };
        try {
          console.log(newUser)
          const response = await fetch("http://localhost:5005/api/auth/login",
          {
            method: "POST",
            body: JSON.stringify(user),
            headers:{
                'Content-type':'application/json',
            },
          }
          );
          if(response.ok){
            setError(false);
          }
           
        } catch (error) {

           setError(true); 
        }
    };
    
    return (
     <div className="loginContainer">
        <div className="logo">
        { /*/have to giv pin */}
            LamaPin
        </div>
        <form onSubmit={handleSubmit}>
            <label>
            <input value={username} placeholder="usernmae" onChange={event=>setUsername(event.target.value)} required/>
            </label>
            <input value={password} type="password" placeholder="password" onChange={event=>setPassword(event.target.value)} required/>
            <button className="loginBtn">Login</button>
        
             { error && 
             <span className="failure">
                Something Went Wrong!!!!
            </span>}
           
            
        </form>
        {/*<Cancel className="loginCancel" onClick={()=>setShowLogin(false)}/>
        
        we have to import cancel icon*/}
     </div>
    )
  }
  
  export default Login