var serialport = require('serialport');
var express = require('express'); // used tosetup routes for backend processing
var cors = require('cors');
// const { database } = require('firebase-functions/lib/providers/firestore');
var Readline = serialport.parsers.Readline;
var bodyParser = require('body-parser');
var buffer = Buffer.alloc(5);

// SERIAL COMMUNICATION
var port = new serialport('COM7',{
  baudRate: 115200,
  //parser: new Readline("\r\n")
})

/*
Express routing handles packing and sending the data to the 
pacemaker using post requests.  The data is taken from
the PaceMode.js form, packaged, and then the writeToPort function 
is called to actually write to the port.
*/
var app = express();
var mode = 0;
var currentMode = 0;
var action = 0;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const expressPort = 8080;

app.post('/writeToPort', (req, res) => {
  // set the variables from the post requet
  currentMode = req.body.modeVal
  action = req.body.action;
  // console.log(currentMode);
  
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
    case 'AOOR':
      mode = 6;
      break;
    default:
      mode = 1;
  }

  // package data here
  buffer[0] = 0x16; //TO CHECK BEGININNG OF DATA
  buffer[1] = action; //FOR READING FROM SIMULINK/BOARD  
  buffer[2] = 0; 
  buffer[3] = 0; 
  buffer[4] = mode;
  if(buffer[1]==0x55){
    console.log('write')
    writeToPort(buffer);
  }
  if(buffer[1]==0x22){
    console.log("read");
      writeToPort(buffer);
      port.on('readable', function (data) {
        port.read() 
      })
      port.on('data', function (data) {
        //port.read();
        console.log(data);
      })
  }
  //console.log(buffer);
  // if(buffer[1]==0x55){ // uncomment this when done testing API calls
  //     buffer[1] = 0x22;
  //     //writeToPort(buffer);
  // }
  // if(buffer[1]==0x22){
  //   port.on('data', function (data) {
  //     console.log(data);
  //     })
  //   }
  
})

// initialize express port
app.listen(expressPort, process.env.IP, () => {
  console.log(`back end express server started on port: ${expressPort}`);
});
// Pipe the data into another stream (like a parser or standard out)
// var lineStream = port.pipe(new Readline());

const writeToPort = (buffer) => {
  port.write(buffer, function(err) {
    if (err) {
      return console.log('Error on write: ', err.message)
    }
    console.log("message written");
  })
}





// port.on('readable', function (data) {
//   port.read();
//   //console.log(port.read()); 
// })
//Switches the port into "flowing mode"

// lineStream.on('data', function (data) {
//   console.log('Data:', data.toString('utf8'));
// });




