import React from 'react';
import { NavLink} from 'react-router-dom';
import download from '../../assets/img/download.png';
import './NavBar.css';
 
function NavBar() {
  return (
    <div className="header">
      <NavLink exact activeClassName="active" to="/">
        <img className="header__img" alt="" src={download}/>
        Home
      </NavLink>
      <NavLink activeClassName="active" to="/login">Login</NavLink>
      <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
    </div>
  );
}
 
export default NavBar;