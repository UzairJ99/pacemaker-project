// this component is used to control the programmable parameters
import React from 'react';
import '../../stylesheets/Interface.css';
import DeviceConnected from '../interface/DeviceConnected';

const Parameters = () => {
    return (
        <div className='leftBar'>
            <DeviceConnected />
            <h4>Parameters</h4>
            <h5>Duty Cycle</h5>
            <input type='number' min='0' max='100'></input>
            <h5>Lower Rate Limit</h5>
            <input></input>
            <h5>Upper Rate Limit</h5>
            <input></input>
            <h5>Atrial Amplitude</h5>
            <input></input>
            <h5>Atrial Pulse Width</h5>
            <input></input>
            <h5>Ventricular Amplitude</h5>
            <input></input>
            <h5>Ventricular Pulse Width</h5>
            <input></input>
        </div>
    );
}

export default Parameters;