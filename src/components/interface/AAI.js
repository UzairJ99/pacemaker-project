import React,{useRef} from 'react';
import '../../stylesheets/PaceMode.css';
import Button from 'react-bootstrap/Button';
import EgramPanel from './EgramPanel';

const AAI = () => {
    let btnRef = useRef();
    const read = ()=>{
        fetch('http://localhost:8080/writeToPort', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value: 0x22,
                modeVal: 'AAI', // state has to be wrapped in curly braces to send properly
            }),
        })
        .catch((err) => console.log(err))
        return <EgramPanel/>
    
    }    
    const write = ()=>{
        fetch('http://localhost:8080/writeToPort', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value: 0x55,
                modeVal: 'AAI', // state has to be wrapped in curly braces to send properly
            }),
        })
        .catch((err) => console.log(err))
        if(btnRef.current){
            btnRef.current.setAttribute("disabled", "disabled");
          }
        btnRef.current.removeAttribute("disabled")
    }
    return (
        // min and max from Pacemaker document; step is the incremental value
        <div>
            <h3>Programmable Parameters</h3>
            <br></br>
            <h5>Lower Rate Limit (ppm)</h5>
            <input type='number' min='30' max='175' step='5'></input>
            <h5>Upper Rate Limit (ppm)</h5>
            <input type='number' min='50' max='175' step ='5'></input>
            <h5>Atrial Amplitude (V)</h5>
            <input type='number' min='0' max='5' step='0.1'></input>
            <h5>Atrial Pulse Width (ms)</h5>
            <input type='number' min='0.1' max='30' step='0.1'></input>
            <h5>Atrial Sensitivity (mV)</h5>
            <input type='number' min='0.25' max='10' step='0.25'></input>
            <h5>ARP</h5>
            <input type='number' min='150' max='500' step='10'></input>
            <h5>PVARP</h5>
            <input type='number' min='150' max='500' step='10'></input>
            <h5>Hysteresis</h5>
            <input type='number' min='0' max='175' step='5'></input>
            <h5>Rate Smoothing (%)</h5>
            <input type='number' min='0' max='25' step='3'></input>
            <Button ref = {btnRef} variant = "secondary" onClick={() => {write()}}>Write</Button>
            <Button variant = "secondary" onClick={() => {read()}}>Read</Button>
        </div>
    );
}

export default AAI;