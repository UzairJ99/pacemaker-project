import React from "react";

const AOO = ()=>{
  return(
  <div>
    <h3>Programmable Parameters</h3>
    <br></br>
    <h5>Lower Rate Limit(ppm)</h5>
    <input type = "number" min = "30" max = "175" step ="5"></input>
    <h5>Upper Rate Limit(ppm)</h5>
    <input type = "number" min = "50" max = "175" step ="5"></input>
    <h5>Atrial Amplitude (V)</h5>
    <input type='number' min='0' max='5' step='0.1'></input>
    <h5>Atrial PulseWidth (ms)</h5>
    <input type='number' min='0.1' max='30' step='0.1'></input>
  </div>
  )
}

export default AOO;