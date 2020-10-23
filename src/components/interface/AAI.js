import React from "react";

const AAI = ()=>{
  return(
    <div>
      <h3>Programmable Parameters</h3>
      <br></br>
      <h5>Lower Rate Limit(ppm)</h5>
      <input type = "number" min = "30" max = "175" step ="5"></input>
      <h5>Upper Rate Limit(ppm)</h5>
      <input type = "number" min = "50" max = "175" step ="5"></input>
      <h5>Atrial Amplitude</h5>
      <input type='number' min='0' max='5' step='1.25'></input>
      <h5>Atrial PulseWidth</h5>
      <input type='number' min='0.05' max='1.9' step='0.1'></input>
      <h5>Atrial Sensitivity</h5>
      <input type='number' min='0.25' max='10' step='0.25'></input>
      <h5>ARP</h5>
      <input type='number' min='150' max='500' step='10'></input>
      <h5>PVARP</h5>
      <input type='number' min='50' max='400' step='10'></input>
      <h5>Hysteresis</h5>
      <input type='number' min='0' max='175' step='5'></input>
      <h5>Rate Smoothing (%)</h5>
      <input type="number" min = "0" max = "25" step = "3"></input>
    </div>
  )
}

export default AAI