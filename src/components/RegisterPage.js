import React from "react";
import logo from '../images/logo.png';
// stylesheets
import '../stylesheets/App.css';

const RegisterPage = () =>{
  return(
    <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Welcome to Register Page
                </p>
            </header>
    </div>
  )
}
export default RegisterPage;