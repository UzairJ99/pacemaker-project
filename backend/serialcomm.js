var serialport = require('serialport');
var Readline = serialport.parsers.Readline;

var port = new serialport('COM4',{
  baudRate: 9600,
  parser: new Readline("\r\n")
})

// Pipe the data into another stream (like a parser or standard out)
var lineStream = port.pipe(new Readline());

port.write('main screen turn on', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message)
  }
  console.log('message written')
})


port.on('readable', function (data) {
  port.read() 
})
// Switches the port into "flowing mode"
// port.on('data', function (data) {
  
// })
lineStream.on('data', function (data) {
  console.log('Data:', data.toString('utf8'));
});



