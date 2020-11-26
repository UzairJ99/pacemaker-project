import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from './modal';
import useModal from './useModal';

const DOO = () => {
    const {isShowing, toggle} = useModal();
    
    const read = ()=>{
        fetch('http://localhost:8080/writeToPort', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 0x22,
                modeVal: 'DOO', // state has to be wrapped in curly braces to send properly
            }),
        })
        .catch((err) => console.log(err))
        toggle();
    }

    const write = ()=>{
        fetch('http://localhost:8080/writeToPort', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 0x55,
                modeVal: 'DOO', // state has to be wrapped in curly braces to send properly
                LRL: document.getElementById("LRL").value,
                URL: document.getElementById("URL").value,
                AVD: document.getElementById("AVD").value,
                Amp: document.getElementById("Amp").value,
                PW: document.getElementById("PW").value,
            }),
        })
        .catch((err) => console.log(err))
    }
    return (
        // min and max from Pacemaker document; step is the incremental value
        <div>
            <h3>Programmable Parameters</h3>
            <br></br>
            <h5>Lower Rate Limit (ppm)</h5>
            <input id="LRL" type='number' min='30' max='170' step='5'></input>
            <h5>Upper Rate Limit (ppm)</h5>
            <input id="URL" type='number' min='50' max='175' step ='5'></input>
            
            <h5>Fix AV Delay (ms)</h5>
            <input id="AVD" type='number' min='70' max='300' step ='10'></input>
            
            <h5>Atrial Amplitude (V)</h5>
            <input id="Amp" type='number' min='0' max='5' step='0.1'></input>
            <h5>Atrial Pulse Width (ms)</h5>
            <input id="PW" type='number' min='0.1' max='30' step='0.1'></input>
            
            <h5>Ventricular Amplitude (V)</h5>
            <input type='number' min='0' max='5' step='0.1'></input>
            <h5>Ventricular Pulse Width (ms)</h5>
            <input type='number' min='0.1' max='30' step='0.1'></input>
            <Button variant="secondary" onClick={read}>Read</Button>
            <Button variant="secondary" onClick={write}>Write</Button>
            {/* <button className="button-default" onClick={toggle}>Show Modal</button> */}
            <Modal
                isShowing={isShowing}
                hide={toggle}
            />
        </div>
    );
}

export default DOO;