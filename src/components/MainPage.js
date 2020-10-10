import React from 'react';
import logo from '../images/logo.png';
// stylesheets
import '../stylesheets/App.css';

const MainPage = () => {
    return (
        <div>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    All functionality (buttons, inputs, etc) go on this page.
                </p>
            </header>
        </div>
    );
}

export default MainPage;