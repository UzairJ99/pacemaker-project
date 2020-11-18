var serialport = require("serialport"); 
var SerialPort = serialport.SerialPort; 

var serialPort = new SerialPort("COM4", {
  baudrate: 115200,
  parser: serialport.parsers.readline("\n")
});