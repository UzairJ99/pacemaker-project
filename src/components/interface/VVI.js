import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from './modal';
import useModal from './useModal';

const VVI = () => {
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
                    modeVal: 'VVI', // state has to be wrapped in curly braces to send properly
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
                modeVal: 'VVI',
                LRL: document.getElementById("LRL").value,
                URL: document.getElementById("URL").value,
                Vamp: document.getElementById("Amp").value,
                VPW: document.getElementById("PW").value,
                Sensitivity: document.getElementById("Sens").value,
                RP: document.getElementById("VRP").value,
                Hysteresis:document.getElementById("hyster").value,
                RateSmoothingUp: document.getElementById("rasmooup").value,
                RateSmoothingDown: document.getElementById("rasmoodown").value,
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
            <h5>Ventricular Amplitude (V)</h5>
            <input id="Amp" type='number' min='0' max='5' step='0.1'></input>
            <h5>Ventricular Pulse Width (ms)</h5>
            <input id="PW" type='number' min='0.1' max='30' step='0.1'></input>
            <h5>Ventricular Sensitivity (mV)</h5>
            <input id="Sens" type='number' min='1' max='10' step='0.5'></input>
            <h5>VRP</h5>
            <input id="VRP" type='number' min='150' max='500' step='10'></input>
            <h5>Hysteresis</h5>
            <input id="hyster" type='number' min='0' max='500' step='5'></input>
            <h5>Rate Smoothing Up(%)</h5>
            <input id="rasmooup" type='number' min='0' max='100' step='3'></input>
            <h5>Rate Smoothing Down(%)</h5>
            <input id="rasmoodown" type='number' min='0' max='100' step='3'></input>
            <Button variant="secondary" onClick={read}>Read</Button>
            <Button variant="secondary" onClick={write}>Write</Button>
            <Modal
                isShowing={isShowing}
                hide={toggle}
                values={graphValues}
            />
        </div>
    );
}

export default VVI;