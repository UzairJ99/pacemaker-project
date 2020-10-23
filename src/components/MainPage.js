import React from 'react';
// stylesheets
import '../stylesheets/App.css';
// components
import { LogOff } from './interface/NavbarComponent';
import Parameters from './interface/Parameters';
import PacingModeNavbar from './interface/PaceMode.js';

const MainPage = () => {
    return (
        <div>
            <LogOff/>
            <Parameters/>
            <PacingModeNavbar/>
        </div>
    );
}

export default MainPage;