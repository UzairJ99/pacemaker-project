var serialport = require("serialport"); 
var SerialPort = serialport.SerialPort; 

var serialPort = new SerialPort("COM1", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});