import React from 'react';

const VOO = () => {
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
            <input type='number' min='0' max='5' step='0.25'></input>
            <h5>Ventricular Pulse Width (ms)</h5>
            <input type='number' min='0.05' max='1.9' step='0.1'></input>
        </div>
    );
}

export default VOO;