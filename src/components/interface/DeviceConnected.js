// this component renders info about what device is connected with the DCM
import React from 'react';
import Button from 'react-bootstrap/Button';


const DeviceConnected = () => {
    /*
    these states will hold what device is connected, and the connection status.
    @device: device name
    @setDevice: set the device name
    @isConnected: connection status true or false
    @setConnection: sets the connection to true or false
    */
    const [device, setDevice] = React.useState('No Device Connected');
    const [isConnected, setConnection] = React.useState(false);

    // find device
    const toggleConnection = (event) => {
        event.preventDefault();
        // if connected, disconnect
        if (isConnected) {
            setConnection(false);
            setDevice('No Device Connected');
        } else {
            // IMPLEMENT LOGIC HERE TO CONNECT TO PERIPHERAL DEVICE
            // search for device
            
            // if search is successful, set device status
            setDevice('SomeDevice001');
            setConnection(true);
        }
    }

    return (
        <div>
            <h4>Device</h4>
            <p>{device}</p>
            <Button disabled variant='light' style={{display: 'inline-block', minWidth: '121.73px'}}>{isConnected ? 'Connected' : 'Disconnected'}</Button>
            <Button variant='dark' onClick={toggleConnection} style={{display: 'inline-block'}}> {isConnected ? 'Disconnect' : 'Connect'} </Button>
        </div>
    );
}

export default DeviceConnected;