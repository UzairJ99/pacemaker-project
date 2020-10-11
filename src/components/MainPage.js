import React from 'react';
// stylesheets
import '../stylesheets/App.css';
// components
import NavbarComponent from './interface/NavbarComponent';

const MainPage = () => {
    return (
        <div>
            <NavbarComponent />
            <h1>System Dashboard</h1>
            <p>
                All functionality (buttons, inputs, etc) go on this page.
            </p>
        </div>
    );
}

export default MainPage;