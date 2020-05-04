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
import SignupDoctor from './components/SignupDoctor/signupDoctor';
import SignupPatient from './components/SignupPatient/signupPatient';
import DashboardPatient from '../src/views/DashboardPatient/DashboardPatient';
import SearchPage from './views/SearchPage/SerachPage'
import ResultPageDoctor from './views/ResultPageDoctor/ResultpageDoctor'

const routes = () => (
    <Fragment>
        {showNavBar()}
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/dashboard-doctor" component={DashboardDoctor} />
            <Route path="/dashboard-patient" component={DashboardPatient} />
            <Route path="/signup" component={Signup} />
            <Route path="/signup-doctor" component={SignupDoctor} />
            <Route path="/search-page" component={SearchPage} />
            <Route path="/signup-patient" component={SignupPatient} />
            <Route path="/result-doctor" component={ResultPageDoctor} />
        </Switch>
    </Fragment>
  );
 
  ReactDOM.render(
      <BrowserRouter>{routes()}</BrowserRouter>,
    document.getElementById('root')
  );