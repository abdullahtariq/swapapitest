import React, { Component } from 'react';
import Login from './components/Login';
import SearchPlanet from './components/SearchPlanet';
import UserStore from './stores/UserStore.js';
// import ContactDetail from './components/ContactDetail';
import { BrowserRouter, Link, Route, Redirect } from 'react-router-dom';

import App from './components/App';

class Root extends Component {

  // We need to provide a list of routes
  // for our app, and in this case we are
  // doing so from a Root component
  render() {
    return (
    <BrowserRouter>

        <Route path='/' render={() => (
          UserStore.isLoggedIn() == true ?  <Redirect to="/search"/> :  <Redirect to="/login"/>
        )}>

        </Route>
        <Route path='/login'  component={Login}/>
        <Route path='/search' component={SearchPlanet} />

    </BrowserRouter>

    );
  }
}

export default Root;
