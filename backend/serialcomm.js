/*
server backend file for processing serial communication as well as setup and all backend logic.
*/
// const baudrate = 115200;
// var port = 8080;
// var docPath = 'c:/node';
// var fs = require('fs');
// var readline = require('readline');
// var rl = readline.createInterface({
//   input: fs.createReadStream('server_config.txt'),
//   output: process.stdout,
//   terminal: false
// })

// rl.on('line', (line) => {
//   console.log(line); // parse line
// })

// // set up Express instance using Socket.io package
// var express = require('express');
// var io = require('socket.io');

// var app = express();
// var server = app.listen(port);
// var socketServer = io(server); // wrap into socket server

// // initialize serial port connection
// var serialport = require("serialport"), 
//     SerialPort = serialport.SerialPort,
//     portName = 'COM4',
//     portConfig = {
//       baudRate: baudrate,
//       parser: new serialport.parsers.Readline('\n')
//     };

// var myPort = new serialport(portName, portConfig)
// .on('error',function(err){
//   console.log(err);
// });

// app.use(express.static(docPath)); // serve files from the public folder
// app.get('/:name', serveFiles); // GET request for all static file requests
// socketServer.on('connection', openSocket); // web socket listener

// const serveFiles = (req, res) => {
//   var fileName = req.params.name;
//   res.sendFile(fileName);
// }

// const openSocket = (socket) => {
//   // display information for socket server address
//   console.log('new user address: ' + socket.handshake.address);
//   socket.emit('message', 'Server listening on address: ' + socket.handshake.address);

//   socket.on('message', (data) => {
//     myPort.write(data); // send data to port
//   });

//   myPort.on('data', (data) => {
//     socket.emit('message', data); // send data to client
//   })
// }

const serialport = require('serialport');
const Readline = serialport.parsers.Readline;
var parser = new Readline({ delimiter: '0a' });
// Pipe the data into another stream (like a parser or standard out)



const port = new serialport('COM4',{
  baudRate: 9600
})

const lineStream = port.pipe(new Readline());

port.write('main screen turn on', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message)
  }
  console.log('message written')
})


port.on('readable', function (data) {
  console.log('Data:', port.read().toString()) // printing this only
})
// Switches the port into "flowing mode"
port.on('data', function (data) {
  
})



