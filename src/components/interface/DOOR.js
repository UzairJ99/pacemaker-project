import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from './modal';
import useModal from './useModal';

const DOOR = () => {
    const {isShowing, toggle} = useModal();
    const [graphValues, setValues] = React.useState([]);
    
    const read = ()=>{
        fetch('http://localhost:8080/writeToPort', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 0x22,
                modeVal: 'DOOR', // state has to be wrapped in curly braces to send properly
            }),
        })
        .then((res) => {
            // convert the data from the backend to JSON format
            var data = res.json();
            return data;
        })
        // process the data
        .then((data) => {
            // set the graph values to what was retrieved from the backend
            return setValues(data);  
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
                modeVal: 'DOOR', // state has to be wrapped in curly braces to send properly
                LRL: document.getElementById("LRL").value,
                URL: document.getElementById("URL").value,
                SensorRate: document.getElementById("SensorRate").value,
                AVD: document.getElementById("AVD").value,
                Aamp: document.getElementById("Aamp").value,
                APW: document.getElementById("APW").value,
                Vamp: document.getElementById("Vamp").value,
                VPW: document.getElementById("VPW").value,
                ActivityThreshold: document.getElementById("ActivityThreshold").value,
                ReactionTime: document.getElementById("ReactionTime").value,    
                RecoveryTime: document.getElementById("RecoveryTime").value
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
            
            <h5>Maximum Sensor Rate (ppm)</h5>
            <input id="SensorRate" type='number' min='50' max='175' step ='5'></input>

            <h5>Fix AV Delay (ms)</h5>
            <input id="AVD" type='number' min='70' max='300' step ='10'></input>
            
            <h5>Atrial Amplitude (V)</h5>
            <input id="Aamp" type='number' min='0' max='5' step='0.1'></input>
            <h5>Atrial Pulse Width (ms)</h5>
            <input id="APW" type='number' min='0.1' max='30' step='0.1'></input>

            <h5>Ventricular Amplitude (V)</h5>
            <input id="Vamp" type='number' min='0' max='5' step='0.1'></input>
            <h5>Ventricular Pulse Width (ms)</h5>
            <input id="VPW" type='number' min='0.1' max='30' step='0.1'></input>

            <h5>Activity Threshold</h5>
            <h5>Low(0.5)  Medium (0.7)  High (0.9)</h5>
            <input id="ActivityThreshold" type='number' min='0' max='3' step='0.1'></input>
            <h5>Reaction Time (sec)</h5>
            <input id="ReactionTime" type='number' min='10' max='50' step='1'></input>
            <h5>Recovery Time (min)</h5>
            <input id="RecoveryTime" type='number' min='0.1' max='16' step='0.1'></input>
            <Button variant="secondary" onClick={read}>Read</Button>
            <Button variant="secondary" onClick={write}>Write</Button>
            {/* <button className="button-default" onClick={toggle}>Show Modal</button> */}
            <Modal
                isShowing={isShowing}
                hide={toggle}
                values={graphValues}
            />
        </div>
    );
}

export default DOOR;