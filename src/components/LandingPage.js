import React from 'react';
import logo from '../images/logo.png';
import {Link} from 'react-router-dom';
// components
import Button from 'react-bootstrap/Button';
// stylesheets
import '../stylesheets/App.css';
import '../stylesheets/LandingPage.css';
// constants
import * as ROUTES from '../constants/routes.js';

const LandingPage = () => {
    return (
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    PACEMAKER DCM
                </p>
                <span style={{width: '50%'}}>
                    <Link to={ROUTES.LOGIN}>
                        <Button variant="light" className='menuBtn'>Login</Button>
                    </Link>
                    <Link to={ROUTES.REGISTER}>
                        <Button variant="light" className='menuBtn'>Register</Button>
                    </Link>
                </span>
            </header>
        </div>
    );
}

export default LandingPage;