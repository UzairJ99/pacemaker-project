import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
// stylesheets
import '../stylesheets/App.css';
// constants
import * as ROUTES from '../constants/routes.js';
// components
import MainPage from './MainPage.js';
import LandingPage from './LandingPage.js';
import Login from './LoginPage'
import Register from './RegisterPage'

function App() {
  /* Controller for page rendering.
    React Router uses the Switch cases to determine which route was reached.
    @path = the url for the page to be rendered. constant values are saved in
    the constants/routes.js file
    inside of Route is the component to be rendered.
  */
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={ROUTES.MAIN}>
            <MainPage />
          </Route>
          <Route path={ROUTES.LANDING}>
            <LandingPage />
          </Route>
          <Route path={ROUTES.LOGIN}>
            <Login />
          </Route>
          <Route path={ROUTES.REGISTER}>
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
