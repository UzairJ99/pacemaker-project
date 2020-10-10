import React from 'react';
import logo from '../images/logo.png';
// stylesheets
import '../stylesheets/App.css';

const LandingPage = () => {
    return (
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Landing page that gives user the option to login/register.
                </p>
            </header>
        </div>
    );
}

export default LandingPage;