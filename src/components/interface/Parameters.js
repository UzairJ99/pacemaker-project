// this component is used to control the programmable parameters
import React from 'react';
import '../../stylesheets/Interface.css';
import DeviceConnected from '../interface/DeviceConnected';

const Parameters = () => {
    return (
        <div className='leftBar'>
            <DeviceConnected />
            <br></br>
            <h4>Utility Parameters</h4>          
        </div>
    );
}

export default Parameters;