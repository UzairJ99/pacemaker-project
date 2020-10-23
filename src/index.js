import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
// Firebase
import Firebase, {FirebaseContext} from './components/Firebase';

ReactDOM.render(
  /*
  React Context API places Firebase Context Provider at the top level of the component hierarchy.
  This gives firebase class access to all components in the component tree.
  */
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);