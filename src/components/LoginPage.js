import React from "react";
import logo from '../images/logo.png';
// stylesheets
import '../stylesheets/App.css';

const LoginPage = () =>{
  return(
    <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Welcome to Login Page
                </p>
            </header>
    </div>
  )
}

export default LoginPage;