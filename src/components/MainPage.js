import React from 'react';
// stylesheets
import '../stylesheets/App.css';
// components
import NavbarComponent from './interface/NavbarComponent';
import Parameters from './interface/Parameters';

const MainPage = () => {
    return (
        <div>
            <NavbarComponent />
            <Parameters/>
        </div>
    );
}

export default MainPage;