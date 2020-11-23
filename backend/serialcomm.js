var serialport = require('serialport');
const { database } = require('firebase-functions/lib/providers/firestore');
var Readline = serialport.parsers.Readline;

var port = new serialport('COM4',{
  baudRate: 115200,
  //parser: new Readline("\r\n")
})
var buffer = Buffer.alloc(5);
buffer[0] = 0x16; //TO CHECK BEGININNG OF DATA
//buffer[1] = 0x55; //FOR WRITING
buffer[1] = 0x22; //FOR READING FROM SIMULINK/BOARD
buffer[2] = 1; //RED
buffer[3] = 0; //GREEN LED
buffer[4] = 0; //BLUE
// Pipe the data into another stream (like a parser or standard out)
var lineStream = port.pipe(new Readline());

port.write(buffer, function(err) {
  if (err) {
    return console.log('Error on write: ', err.message)
  }
  console.log("message written");
})




// port.on('readable', function (data) {
//   port.read();
//   //console.log(port.read()); 
// })
//Switches the port into "flowing mode"
if(buffer[1]==0x22){
port.on('data', function (data) {
  console.log(data);
  })
}
lineStream.on('data', function (data) {
  console.log('Data:', data.toString('utf8'));
});




