var serialport = require("serialport"); 
var SerialPort = serialport.SerialPort; 

// var serialPort = new SerialPort("USB\VID_1366&PID_1015&MI_00\6&80004E7&0&0000", {
//   baudRate: 115200,
// });

// var serialPort = new SerialPort("/USB/VID_1366&PID_1015&MI_00/6&80004E7&0&0000", {
//   baudRate: 115200,
// });

// var serialPort = new SerialPort("USB/VID_1366&PID_1015&MI_00/6&80004E7&0&0000", {
//   baudRate: 115200,
// });

var serialPort = new SerialPort("COM4", {
  baudRate: 115200,
});

serialPort.write('main screen turn on', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message)
  }
  console.log('message written')
})