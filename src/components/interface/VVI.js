import React from 'react';

const VVI = () => {
    return (
        // min and max from Pacemaker document; step is the incremental value
        <div>
            <h3>Programmable Parameters</h3>
            <br></br>
            <h5>Lower Rate Limit (ppm)</h5>
            <input type='number' min='30' max='170' step='5'></input>
            <h5>Upper Rate Limit (ppm)</h5>
            <input type='number' min='50' max='175' step ='5'></input>
            <h5>Ventricular Amplitude (V)</h5>
            <input type='number' min='0' max='5' step='0.1'></input>
            <h5>Ventricular Pulse Width (ms)</h5>
            <input type='number' min='0.1' max='30' step='0.1'></input>
            <h5>Ventricular Sensitivity (mV)</h5>
            <input type='number' min='1' max='10' step='0.5'></input>
            <h5>VRP</h5>
            <input type='number' min='150' max='500' step='10'></input>
            <h5>Hysteresis</h5>
            <input type='number' min='0' max='170' step='5'></input>
            <h5>Rate Smoothing (%)</h5>
            <input type='number' min='0' max='25' step='3'></input>
        </div>
    );
}

export default VVI;