const serialport = require("serialport"); 
// const Readline = serialport.parsers.Readline;
// var readline = require('readline');
// const { read } = require("fs");

const serialPort = new serialport("COM7", {
  baudRate: 115200,
  // parser: serialport.parsers.readline("\n")
},{ autoOpen: false })
.on('error',function(err){
  console.log(err);
});

// const parser = new Readline();
// const lineStream = serialPort.pipe(parser);

// parser.on('data', console.log);
// serialPort.write('kms\n');

// // Read data that is available but keep the stream in "paused mode"
// serialPort.on('readable', function () {
//   console.log('Data:', port.read())
// })

// // Switches the port into "flowing mode"
// serialPort.on('data', function (data) {
//   console.log('Data:', data)
// })

// // Pipe the data into another stream (like a parser or standard out)

// console.log(parser);

// serialport.parsers = {
//   ByteLength: require('@serialport/parser-byte-length'),
//   CCTalk: require('@serialport/parser-cctalk'),
//   Delimiter: require('@serialport/parser-delimiter'),
//   Readline: require('@serialport/parser-readline'),
//   Ready: require('@serialport/parser-ready'),
//   Regex: require('@serialport/parser-regex'),
// }

// serialPort.on('open',function(){
//
//   //   serialPort.write('main screen turn on', function(err) {
//   //     if (err) {
//   //       return console.log('Error on write: ', err.message)
//   //     }
//   //   })
//   
//   write();
//   read();
  
//     // serialPort.on('data', function(data) {
//     //   console.log(data);
//     // });
// })



// serialPort.on('open', () => {
//   write();
//   read();
// });
serialPort.open(err=>{
  if(err) console.log(err);
  else{
    serialPort.write("Hi man im gonna kms!!!!!! and its ur fault!!!!!!! Yo I am sorry");
    serialPort.read();
  }
})