var serialport = require('serialport');
var express = require('express'); // used tosetup routes for backend processing
var cors = require('cors');
var ByteLength = require('@serialport/parser-byte-length');
var bodyParser = require('body-parser');

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

app.post('/writeToPort', (req, res) => {
  var buffer = Buffer.alloc(44);
  var ATR_Signal;
  var VENT_Signal;
  var ATR_Signal_val;
  var VENT_Signal_val;

  var outputValues = [];

  // default values all set to zero
  var mode, currentMode, action = 0;
  var LRL, URL, Amp, PW, AVD, Aamp, Vamp, APW, VPW = 0;
  var Sensitivity, RP, PVARP, Hysteresis, RateSmoothingUp,RateSmoothingDown, ActivityThreshold, ReactionTime,
      RecoveryTime, SensorRate = 0;

  // set the variables from the post requet
  currentMode = req.body.modeVal
  action = req.body.action;
  if(req.body.LRL){
    LRL = req.body.LRL;
  } 
  if(req.body.URL){
    URL = req.body.URL;
  } 
  if(req.body.Aamp){
    Aamp = req.body.Aamp;
  } 
  if(req.body.APW){
    APW = req.body.APW;
  } 
  if(req.body.Vamp){
    Vamp = req.body.Vamp;
  } 
  if(req.body.VPW){
    VPW = req.body.VPW;
  } 
  if(req.body.AVD){
    AVD = req.body.AVD;
  }
  if(req.body.Sensitivity){
    Sensitivity = req.body.Sensitivity;
  } 
  if(req.body.RP){
    RP = req.body.RP;
  } 
  if(req.body.PVARP){
    PVARP = req.body.PVARP;
  }
  if(req.body.Hysteresis){
    Hysteresis = req.body.Hysteresis;
  }
  if(req.body.RateSmoothingUp){
    RateSmoothingUp = req.body.RateSmoothingUp;
  }
  if(req.body.RateSmoothingDown){
    RateSmoothingDown = req.body.RateSmoothingDown;
  }
  if(req.body.ActivityThreshold){
    ActivityThreshold = req.body.ActivityThreshold;
  } 
  if(req.body.ReactionTime){
    ReactionTime = req.body.ReactionTime;
  } 
  if(req.body.RecoveryTime){
    RecoveryTime = req.body.RecoveryTime;
  }
  if(req.body.SensorRate){
    SensorRate = req.body.SensorRate;
  }
  
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

  // package data here
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
  
  // write
  if(buffer[1]==0x55){
    console.log('write')
    writeToPort(buffer);
  }

  // read
  if(buffer[1]==0x22){
    const parser = port.pipe(new ByteLength({length: 58}))
    console.log("read");
    writeToPort(buffer);

    parser.on('data', function (data) {
      port.read();

      var Mode = data.readInt8(0);
      var Atrial_Sensitivity = data.readFloatLE(1);
      var Ventricular_Sensitivity = data.readFloatLE(5);
      var Vent_Amplitude = data.readFloatLE(9);
      var LRL = data.readInt8(13);
      var Vent_Pulse_Width = data.readInt8(14);
      var Refactory_Period = data.readInt16LE(15);
      var PVARP = data.readInt16LE(17);
      var Hysteresis_enable = data.readInt8(19);
      var Hysteresis_Period= data.readInt16LE(20);
      var URL=data.readInt8(22);
      var Rate_Smoothing_Up = data.readInt8(23);
      var Rate_Smoothing_Down = data.readInt8(24);
      var Fixed_AV_Delay = data.readInt16LE(25);
      var Maximum_Sensor_limit = data.readInt8(27);
      var Activity_Threshold = data.readFloatLE(28);
      var Reaction_Time = data.readInt8(32);
      var Recovery_Time = data.readFloatLE(33);
      var Atr_Pulse_Width =data.readInt8(37);
      var Atr_Pulse_Amplitude = data.readFloatLE(38);
      
      vent_Signal = data.slice(42,50);
      VENT_Signal_val = (vent_Signal.readDoubleLE(0));
      ATR_Signal_val = (data.readDoubleLE(50));
      outputValues = [ATR_Signal_val, VENT_Signal_val, Mode, Atrial_Sensitivity, Ventricular_Sensitivity, Vent_Amplitude, LRL, Vent_Pulse_Width, Refactory_Period, PVARP, Hysteresis_enable, Hysteresis_Period, URL, Rate_Smoothing_Up, Rate_Smoothing_Down, Fixed_AV_Delay, Maximum_Sensor_limit, Activity_Threshold, Reaction_Time, Recovery_Time, Atr_Pulse_Width,Atr_Pulse_Amplitude];

      res.send(outputValues);
    })
  }
})

// initialize express port
app.listen(expressPort, process.env.IP, () => {
  console.log(`back end express server started on port: ${expressPort}`);
});

const writeToPort = (buffer) => {
  port.write(buffer, function(err) {
    if (err) {
      return console.log('Error on write: ', err.message)
    }
    console.log("message written");
  })
}