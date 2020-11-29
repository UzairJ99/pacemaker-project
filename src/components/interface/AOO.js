import React, {useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Modal from './modal';
import useModal from './useModal';

const AOO = ()=>{
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
                    modeVal: 'VOO', // state has to be wrapped in curly braces to send properly
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
                modeVal: 'AOO',
                LRL: document.getElementById("LRL").value,
                URL: document.getElementById("URL").value,
                Aamp: document.getElementById("Amp").value,
                APW: document.getElementById("PW").value,
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
    <h5>Atrial Amplitude (V)</h5>
    <input id="Amp" type='number' min='0' max='5' step='0.1'></input>
    <h5>Atrial PulseWidth (ms)</h5>
    <input id="PW" type='number' min='0.1' max='30' step='0.1'></input>
  
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

export default AOO;