import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { showNavBar } from '../src/utils/showNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from '../src/views/Login/Login';
import DashboardDoctor from '../src/views/DashboardDoctor/DashboardDoctor';
import Home from '../src/views/Home/Home';
import Signup from '../src/views/Signup/Signup'
import SignupDoctor from './components/signupDoctor/signupDoctor';
import SignupPatient from './components/signupPatient/signupPatient';
import DashboardPatient from '../src/views/DashboardPatient/DashboardPatient';
import SearchPage from './views/SearchPage/SerachPage'

const routes = () => (
    <Fragment>
        {/* {showNavBar()} */}
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/dashboard-doctor" component={DashboardDoctor} />
            <Route path="/dashboard-patient" component={DashboardPatient} />
            <Route path="/signup" component={Signup} />
            <Route path="/signup-doctor" component={SignupDoctor} />
            <Route path="/search-page" component={SearchPage} />
            <Route path="/signup-patient" component={SignupPatient} />
        </Switch>
    </Fragment>
  );
 
  ReactDOM.render(
      <BrowserRouter>{routes()}</BrowserRouter>,
    document.getElementById('root')
  );