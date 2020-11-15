import React from 'react';

const AOOR = () =>{
  return(
    <div>
        <h3>Programmable Parameters</h3>
        <br></br>
        <h5>Lower Rate Limit(ppm)</h5>
        <input type = "number" min = "30" max = "175" step ="5"></input>
        <h5>Upper Rate Limit(ppm)</h5>
        <input type = "number" min = "50" max = "175" step ="5"></input>
        <h5>Maximum Sensor Rate(ppm)</h5>
        <input type = "number" min = "50" max = "175" step ="5"></input>
        <h5>Atrial Amplitude (V)</h5>
        <input type='number' min='0' max='5' step='0.1'></input>
        <h5>Atrial PulseWidth (ms)</h5>
        <input type='number' min='0.1' max='30' step='0.1'></input>
        <h5>Activity threshold</h5>
        <input type = "number" min = "0" max = "6" step ="1"></input>
        <h5>Reaction Time(sec)</h5>
        <input type = "number" min = "10" max = "50" step ="10"></input>
        <h5>Response Factor</h5>
        <input type = "number" min = "1" max = "16" step ="1"></input>
        <h5>Recovery Time(min)</h5>
        <input type = "number" min = "2" max = "16" step ="1"></input>
    </div>
  )
}

export default AOOR;