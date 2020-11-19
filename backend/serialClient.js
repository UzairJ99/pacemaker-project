/*
Ignore the content of this file for now. Keep it here but it has no use as of right now.
*/

var socket = io();

const readData = (data) => {
    console.log(data);
    $('#data_window').append(data);
}

socket.on('message', readData);