var serialport = require('serialport');
var express = require('express');
var cors = require('cors');
var ByteLength = require('@serialport/parser-byte-length');
var bodyParser = require('body-parser');
const { once } = require('events');

// SERIAL COMMUNICATION
var port = new serialport('COM4',{
  baudRate: 115200,
})

/*
Express routing handles packing and sending the data to the 
pacemaker using post requests.  The data is taken from
the PaceMode.js form, packaged, and then the writeToPort function 
is called to actually write to the port.
*/
var app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const expressPort = 8080;

// global parameters change based on pacemode
var ATR_Signal_val;
var VENT_Signal_val;
var outputValues = [];
// default values all set to zero
var mode, currentMode, action = 0;
var LRL, URL, Amp, PW, AVD, Aamp, Vamp, APW, VPW = 0;
var Sensitivity, RP, PVARP, Hysteresis, RateSmoothingUp,RateSmoothingDown, ActivityThreshold, ReactionTime,
      RecoveryTime, SensorRate = 0;


/**
 * Sets the parameters for the pacing mode.
 * @param {object} params the request body 
 */
const setParameters = (params) => {
  // set the variables from the post request
  currentMode = params.modeVal
  action = params.action;

  // set the variables only if they exist in the request
  if(params.LRL) {
    LRL = params.LRL;
  } 
  if(params.URL) {
    URL = params.URL;
  } 
  if(params.Aamp) {
    Aamp = params.Aamp;
  } 
  if(params.APW) {
    APW = params.APW;
  } 
  if(params.Vamp) {
    Vamp = params.Vamp;
  } 
  if(params.VPW) {
    VPW = params.VPW;
  } 
  if(params.AVD) {
    AVD = params.AVD;
  }
  if(params.Sensitivity) {
    Sensitivity = params.Sensitivity;
  } 
  if(params.RP) {
    RP = params.RP;
  } 
  if(params.PVARP) {
    PVARP = params.PVARP;
  }
  if(params.Hysteresis) {
    Hysteresis = params.Hysteresis;
  }
  if(params.RateSmoothingUp) {
    RateSmoothingUp = params.RateSmoothingUp;
  }
  if(params.RateSmoothingDown) {
    RateSmoothingDown = params.RateSmoothingDown;
  }
  if(params.ActivityThreshold) {
    ActivityThreshold = params.ActivityThreshold;
  } 
  if(params.ReactionTime) {
    ReactionTime = params.ReactionTime;
  } 
  if(params.RecoveryTime) {
    RecoveryTime = params.RecoveryTime;
  }
  if(params.SensorRate) {
    SensorRate = params.SensorRate;
  }
}

/**
 * sets the pace mode for the pacemaker device and monitor.
 */
const setPacingMode = () => {
  switch(currentMode){
    case 'VOO':
      mode = 1;
      break;
    case 'AOO':
      mode = 2;
      break;
    case 'VVI':
      mode = 3;
      break;
    case 'AAI':
      mode = 4;
      break;
    case 'DOO':
      mode = 5;
      break;
    case 'VOOR':
      mode = 6;
      break;
    case 'AOOR':
      mode = 7;
      break;
    case 'VVIR':
      mode = 8;
      break;
    case 'AAIR':
      mode = 9;
      break;
    case 'DOOR':
      mode = 10;
      break;
    default:
      mode = 1;
  } 
}

/**
 * packages the buffer with the values based on parameters and pacing mode.
 * @returns {Buffer} data to send to pacemaker through serial comm
 */
const packageData = () => {
  let buffer = Buffer.alloc(44);

  for(let i=2; i<44; i++){
    buffer[i] = 0;
  }

  buffer[0] = 0x16; //TO CHECK BEGININNG OF DATA
  buffer[1] = action; //FOR READING FROM SIMULINK/BOARD  
  buffer[2] = mode; //MODE
  buffer.writeFloatLE(Sensitivity,3); //Atrial Sensitivity
  buffer.writeFloatLE(Sensitivity,7);//Ventricular Sensitivity
  buffer.writeFloatLE(Vamp,11);//Vent_Pulse Amp
  buffer[15]=LRL; // LRL OR PPM 
  buffer[16]=VPW; //Ventricular Pulse width
  buffer.writeUInt16LE(RP,17); //Ref Period
  buffer.writeUInt16LE(PVARP,19); //PVARP
  buffer[21]=0; //Hysteresis enable
  buffer.writeUInt16LE(Hysteresis,22); //Hysteresis Value
  buffer[24]=URL; //URL
  buffer[25]=RateSmoothingUp; //Rate Smoothing UP 
  buffer[26]=RateSmoothingDown; //Rate smoothing Down
  buffer.writeUInt16LE(AVD,27); //Fixed AV Delay
  buffer[29]= SensorRate;//Max sensor Limit in PPM
  buffer.writeFloatLE(ActivityThreshold,30);//Activity Threshold
  buffer[34]=ReactionTime;//Reaction Time in seconds
  buffer.writeFloatLE(RecoveryTime,35);//Recovery Time in Minutes
  buffer[39] = APW; //Atrial Pulse Width
  buffer.writeFloatLE(Aamp,40); // Atr Pulse Amp

  return buffer;
}

/**
 * Writes the given buffer to the pacemaker device.
 * @param {Buffer} buffer the serial packet 
 */
 const writeToPort = (buffer) => {
  port.write(buffer, function(err) {
    if (err) {
      return console.log('Error on write: ', err.message)
    }
    console.log("message written");
  })
}

/**
 * Reads data from the serial port
 * @returns {Array} output values of parameters
 */
const readFromPort = async () => {
  const parser = port.pipe(new ByteLength({length: 58}));

  parser.on('data', function (data) {
    port.read();

    // create seperate local variables to pass to frontend for graphs
    let Mode = data.readInt8(0);
    let Atrial_Sensitivity = data.readFloatLE(1);
    let Ventricular_Sensitivity = data.readFloatLE(5);
    let Vent_Amplitude = data.readFloatLE(9);
    let LRL = data.readInt8(13);
    let Vent_Pulse_Width = data.readInt8(14);
    let Refactory_Period = data.readInt16LE(15);
    let PVARP = data.readInt16LE(17);
    let Hysteresis_enable = data.readInt8(19);
    let Hysteresis_Period= data.readInt16LE(20);
    let URL=data.readInt8(22);
    let Rate_Smoothing_Up = data.readInt8(23);
    let Rate_Smoothing_Down = data.readInt8(24);
    let Fixed_AV_Delay = data.readInt16LE(25);
    let Maximum_Sensor_limit = data.readInt8(27);
    let Activity_Threshold = data.readFloatLE(28);
    let Reaction_Time = data.readInt8(32);
    let Recovery_Time = data.readFloatLE(33);
    let Atr_Pulse_Width =data.readInt8(37);
    let Atr_Pulse_Amplitude = data.readFloatLE(38);
    
    vent_Signal = data.slice(42,50);
    VENT_Signal_val = (vent_Signal.readDoubleLE(0));
    ATR_Signal_val = (data.readDoubleLE(50));
    outputValues = [
      ATR_Signal_val, VENT_Signal_val, Mode, Atrial_Sensitivity, 
      Ventricular_Sensitivity, Vent_Amplitude, LRL, Vent_Pulse_Width, Refactory_Period, 
      PVARP, Hysteresis_enable, Hysteresis_Period, URL, Rate_Smoothing_Up, Rate_Smoothing_Down, 
      Fixed_AV_Delay, Maximum_Sensor_limit, Activity_Threshold, Reaction_Time, Recovery_Time, 
      Atr_Pulse_Width,Atr_Pulse_Amplitude
    ];
  });

  // wait for parser to finish reading the data
  await once(parser, 'close');
  return outputValues;
}

app.post('/writeToPort', (req, res) => {

  setParameters(req.body);
  setPacingMode();
  // data to send over through serial comm
  let buffer = packageData();
  
  // write
  if(buffer[1]==0x55) {
    writeToPort(buffer);
  }

  // read
  if(buffer[1]==0x22) {
    writeToPort(buffer);
    let output = readFromPort();
    res.send(output);
  }
})

// initialize express port
app.listen(expressPort, process.env.IP, () => {
  console.log(`back end express server started on port: ${expressPort}`);
});