import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import "../components/NavBar.css"
import { NavLink } from 'react-router-dom';


const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

  

    return ( 
        <nav>
            <p className="title" >
        MyPlaceKeeper
      </p>
    <div className='menu' onClick={()=>setMenuOpen(!menuOpen)}>
        <MenuIcon/>
        </div>
        <ul className={menuOpen ? "open" : ""} >
            <li>
                <NavLink to="/">Map</NavLink>
            </li>
            <li>
                <NavLink to="/register" >Sign Up</NavLink>
            </li>
            <li>
                <NavLink to="/login">Login</NavLink>
            </li>
            <li>
                <NavLink to="/">About</NavLink>
            </li>
            <li>
                <NavLink to="/profile">Profile</NavLink>
            </li>
        </ul>
        </nav>
     );
}
 
export default NavBar;