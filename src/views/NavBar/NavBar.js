import React from 'react';
import { NavLink} from 'react-router-dom';
import download from '../../assets/img/download.png';
import './NavBar.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
 
function NavBar() {
  return (
    // <div className="header">
    //   <NavLink exact activeClassName="active" to="/dashboard-doctors">
    //     <img className="header__img" alt="" src={download}/>
    //     Início
    //   </NavLink>
    //   <NavLink activeClassName="active" to="/">Login</NavLink>
    // </div>
    <div>
    <AppBar position="fixed" className="header">
      <Toolbar variant="dense">
      <img className="header__img" alt="" src={download}/>
        <Typography variant="h6" color="inherit">
          Photos
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
  );
}
 
export default NavBar;