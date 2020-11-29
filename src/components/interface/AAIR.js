import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from './modal';
import useModal from './useModal';

const AAIR = () =>{
    const {isShowing, toggle} = useModal();
    const [graphValues, setValues] = React.useState([]);
    const [isReading, setRead] = React.useState(false);
    const [refresh, setRefresh] = React.useState(0);

    // update values for graph
    useEffect(() => {
        setInterval(()=> {
            setRefresh((prevTemp) => prevTemp + 1)
        }, 1);
    }, [])

    useEffect(() => {
        if(isReading) {
            fetchData();
        }
    }, [refresh])

    // asynchronous fetch function for retrieving data from backend
    const fetchData = async() => {
        try{
            const response = await fetch('http://localhost:8080/writeToPort', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 0x22,
                    modeVal: 'AAIR', // state has to be wrapped in curly braces to send properly
                }),
            });
            if(!response.ok){throw Error(response.statusText);};
            const json = await response.json()
            setValues(json);
            console.log(graphValues, json);
        }
        catch (err) {
            console.log(err);
        }
    }

    const read = ()=>{
        setRead(true);
        fetchData(); // first time
        toggle(); // show graph
    }

    const write = ()=>{
        setRead(false);
        fetch('http://localhost:8080/writeToPort', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 0x55,
                modeVal: 'AAIR',
                LRL: document.getElementById("LRL").value,
                URL: document.getElementById("URL").value,
                Aamp: document.getElementById("Amp").value,
                APW: document.getElementById("PW").value,
                SensorRate: document.getElementById("SensorRate").value,
                Sensitivity: document.getElementById("Sensitivity").value,
                RP: document.getElementById("RP").value,
                Hysteresis:document.getElementById("Hysteresis").value,
                PVARP: document.getElementById("PVARP").value,
                ActivityThreshold: document.getElementById("ActivityThreshold").value,
                RateSmoothingUp: document.getElementById("rasmooup").value,
                RateSmoothingDown: document.getElementById("rasmoodown").value,
                ReactionTime: document.getElementById("ReactionTime").value,
                RecoveryTime: document.getElementById("RecoveryTime").value,
            }),
        })
        .catch((err) => console.log(err))
    }
  return(
    <div>
        <h3>Programmable Parameters</h3>
        <br></br>
        <h5>Lower Rate Limit(ppm)</h5>
        <input id="LRL" type = "number" min = "30" max = "175" step ="5"></input>
        <h5>Upper Rate Limit(ppm)</h5>
        <input id="URL" type = "number" min = "50" max = "175" step ="5"></input>
        <h5>Maximum Sensor Rate(ppm)</h5>
        <input id="SensorRate" type = "number" min = "50" max = "175" step ="5"></input>
        <h5>Atrial Amplitude (V)</h5>
        <input id="Amp" type='number' min='0' max='5' step='0.1'></input>
        <h5>Atrial PulseWidth (ms)</h5>
        <input id="PW" type='number' min='0.1' max='30' step='0.1'></input>
        <h5>Atrial Sensitivity (mV)</h5>
        <input id="Sensitivity" type='number' min='0.25' max='10' step='0.25'></input>
        <h5>ARP</h5>
        <input id="RP" type='number' min='150' max='500' step='10'></input>
        <h5>PVARP</h5>
        <input id="PVARP" type='number' min='150' max='500' step='10'></input>
        <h5>Hysteresis</h5>
        <input id="Hysteresis" type='number' min='0' max='500' step='5'></input>
        <h5>Rate Smoothing Up(%)</h5>
        <input id="rasmooup" type='number' min='0' max='100' step='3'></input>
        <h5>Rate Smoothing Down(%)</h5>
        <input id="rasmoodown" type='number' min='0' max='100' step='3'></input>
        <h5>Activity threshold</h5>
        <h5>Low(0.5)  Medium (0.7)  High (0.9)</h5>
        <input id="ActivityThreshold" type = "number" min = "0" max = "3" step ="0.1"></input>
        <h5>Reaction Time(sec)</h5>
        <input id="ReactionTime" type = "number" min = "10" max = "50" step ="10"></input>
        <h5>Recovery Time(min)</h5>
        <input id="RecoveryTime" type = "number" min = "0.1" max = "16" step ="0.1"></input>
        <Button variant="secondary" onClick={read}>Read</Button>
        <Button variant="secondary" onClick={write}>Write</Button>
        <Modal
                isShowing={isShowing}
                hide={toggle}
                values = {graphValues}
            />
    </div>
  )
}

export default AAIR;