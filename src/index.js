import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { showNavBar } from '../src/utils/showNavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from '../src/views/Login/Login';
import Dashboard from '../src/views/Dashboard/Dashboard';
import Home from '../src/views/Home/Home';
import Signup from '../src/views/Signup/Signup'
import SignupDoctor from '../src/components/SignupDoctor/signupDoctor';
import SignupPatient from '../src/components/SignupPatient/signupPatient';

const routes = () => (
    <Fragment>
        {showNavBar()}
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/signup" component={Signup} />
            <Route path="/signup-doctor" component={SignupDoctor} />
            <Route path="/signup-patient" component={SignupPatient} />
        </Switch>
    </Fragment>
  );
 
  ReactDOM.render(
      <BrowserRouter>{routes()}</BrowserRouter>,
    document.getElementById('root')
  );