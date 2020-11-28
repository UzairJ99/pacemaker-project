import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from './modal';
import useModal from './useModal';

const AOOR = () =>{

  const {isShowing, toggle} = useModal();
    
  const read = ()=>{
      fetch('http://localhost:8080/writeToPort', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              action: 0x22,
              modeVal: 'AOOR', // state has to be wrapped in curly braces to send properly
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
              modeVal: 'AOOR', 
              LRL: document.getElementById("LRL").value,
              URL: document.getElementById("URL").value,
              Aamp: document.getElementById("Aamp").value,
              APW: document.getElementById("APW").value,
              ActivityThreshold: document.getElementById("ActivityThreshold").value,
              ReactionTime: document.getElementById("ReactionTime").value,
              RecoveryTime: document.getElementById("RecoveryTime").value,
              SensorRate: document.getElementById("SensorRate").value,
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
        <input id="Aamp" type='number' min='0' max='5' step='0.1'></input>
        <h5>Atrial PulseWidth (ms)</h5>
        <input id="APW" type='number' min='0.1' max='30' step='0.1'></input>
        <h5>Activity threshold</h5> 
        <h5>Low(0.5)  Medium (0.7)  High (0.9)</h5>
        <input id="ActivityThreshold" type = "number" min = "0" max = "3" step ="0.1"></input>
        <h5>Reaction Time(sec)</h5>
        <input id="ReactionTime" type = "number" min = "10" max = "50" step ="10"></input>
        <h5>Recovery Time(min)</h5>
        <input id="RecoveryTime" type = "number" min = "0.1" max = "16" step ="0.1"></input>
    
        <Button variant="secondary" onClick={read}>Read</Button>
        <Button variant="secondary" onClick={write}>Write</Button>
        {/* <button className="button-default" onClick={toggle}>Show Modal</button> */}
        <Modal
            isShowing={isShowing}
            hide={toggle}
        />
    
    </div>
  )
}

export default AOOR;