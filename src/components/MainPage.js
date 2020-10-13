import React from 'react';
// stylesheets
import '../stylesheets/App.css';
// components
import { LogOff } from './interface/NavbarComponent';
import Parameters from './interface/Parameters';

const MainPage = () => {
    return (
        <div>
            <LogOff/>
            <Parameters/>
        </div>
    );
}

export default MainPage;