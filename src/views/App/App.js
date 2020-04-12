import React from 'react';
import { BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';
import download from '../../assets/img/download.png'
 
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import Home from '../Home/Home';
import './App.css'
 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink exact activeClassName="active" to="/">
              <img className="header__img" src={download}/>
              Home
            </NavLink>
            <NavLink activeClassName="active" to="/login">Login</NavLink>
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink>
          </div>
          <div className="content">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
 
export default App;