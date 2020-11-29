import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from './modal';
import useModal from './useModal';

const VOO = () => {
    const {isShowing, toggle} = useModal();
    const [graphValues, setValues] = React.useState([]);
    const [isReading, setRead] = React.useState(false);
    const [refresh, setRefresh] = React.useState(0);

    // update values for graph
    useEffect(() => {
        setInterval(()=> {
            setRefresh((prevTemp) => prevTemp + 1)
        }, 100);
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
                    modeVal: 'VOO', // state has to be wrapped in curly braces to send properly
                }),
            });
            if(!response.ok){throw Error(response.statusText);};
            const json = await response.json()
            setValues([json[0], json[1]]);
            document.getElementById('LRL').value = json[6];
            document.getElementById('URL').value = json[12];
            document.getElementById('Vamp').value = json[5];
            document.getElementById('LRL').value = json[7];
            //console.log(graphValues);
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
                modeVal: 'VOO',
                LRL: document.getElementById("LRL").value,
                URL: document.getElementById("URL").value,
                Vamp: document.getElementById("Vamp").value,
                VPW: document.getElementById("VPW").value,
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
            <input id = "LRL" type='number' min='30' max='170' step='5'></input>
            <h5>Upper Rate Limit (ppm)</h5>
            <input id="URL" type='number' min='50' max='175' step ='5'></input>
            <h5>Ventricular Amplitude (V)</h5>
            <input id="Vamp" type='number' min='0' max='5' step='0.1'></input>
            <h5>Ventricular Pulse Width (ms)</h5>
            <input id="VPW" type='number' min='0.1' max='30' step='0.1'></input>
            <Button variant="secondary" onClick={read}>Read</Button>
            <Button variant="secondary" onClick={write}>Write</Button>
            <Modal
                isShowing={isShowing}
                hide={toggle}
                values = {graphValues}
            />
        </div>
    );
}

export default VOO;