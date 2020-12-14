import React,{useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
// stylesheets
import '../stylesheets/App.css';
// constants
import * as ROUTES from '../constants/routes.js';
// components
import MainPage from './MainPage.js';
import LandingPage from './LandingPage.js';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
// authorization
import { withFirebase } from './Firebase/index';


function App(props) {
  /* Controller for page rendering.
    React Router uses the Switch cases to determine which route was reached.
    @path = the url for the page to be rendered. constant values are saved in
    the constants/routes.js file
    inside of Route is the component to be rendered.
    The landing page route should always be the last route listed.
  */

  // session handling
  const [authUser, setAuthUser] = React.useState(null);

  // check for change in global state
  useEffect(() => {
    props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? setAuthUser({ authUser })
        : setAuthUser({ authUser: null });
    });
  });

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={ROUTES.MAIN}>
            {
              // renders the page whether the user has logged in or not - otherwise redirect to login page
              //(authUser != null) ? <MainPage authUser={authUser} /> : <Redirect to={ROUTES.LOGIN} /> 
              <MainPage authUser={authUser} />
            }
          </Route>
          <Route path={ROUTES.LOGIN}>
            <LoginPage />
          </Route>
          <Route path={ROUTES.REGISTER}>
            <RegisterPage />
          </Route>
          <Route path={ROUTES.LANDING}>
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default withFirebase(App);
