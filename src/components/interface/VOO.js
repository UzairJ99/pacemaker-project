import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {Row, Col} from 'react-bootstrap';
import Modal from './modal';
import useModal from './useModal';
import {Doughnut} from 'react-chartjs-2';
import '../../stylesheets/Interface.css';

const VOO = () => {
    const {isShowing, toggle} = useModal();
    const [graphValues, setValues] = React.useState([]);
    const [isReading, setRead] = React.useState(false);
    const [refresh, setRefresh] = React.useState(0);

    //const [lrlVal, setLRLdata] = React.useState(30);
    var initialParams = {
        'lrl': 30,
        'url': 50,
        'ventAmp': 0,
        'ventPW': 0.1
    }
    const [parameters, setParameters] = React.useState(initialParams)
    
    var lrlData = {datasets: [{
        labels: ['1', '2'],
        data: [parameters['lrl'], (170-parameters['lrl'])],
        fill: true,
        backgroundColor: ['rgb(107, 186, 255)', 'rgb(199, 199, 199)'],
    }]};

    var urlData = {datasets: [{
        labels: ['1', '2'],
        data: [parameters['url'], (175-parameters['url'])],
        fill: true,
        backgroundColor: ['rgb(107, 186, 255)', 'rgb(199, 199, 199)'],
    }]};

    var ventAmpData = {datasets: [{
        labels: ['1', '2'],
        data: [parameters['ventAmp'], (5-parameters['ventAmp'])],
        fill: true,
        backgroundColor: ['rgb(107, 186, 255)', 'rgb(199, 199, 199)'],
    }]};

    var ventPWData = {datasets: [{
        labels: ['1', '2'],
        data: [parameters['ventPW'], (30-parameters['ventPW'])],
        fill: true,
        backgroundColor: ['rgb(107, 186, 255)', 'rgb(199, 199, 199)'],
    }]};

    /*
    The following two useEffect functions make continous calls to
    the fetch function to gather data from the backend every 1ms.
    */
    useEffect(() => {
        setInterval(()=> {
            setRefresh((prevTemp) => prevTemp + 1)
        }, 100);
    }, [])

    useEffect(() => {
        // only fetch data if in read mode
        if(isReading) {
            fetchData();
        }
    }, [refresh])

    // asynchronous fetch function for retrieving data from backend
    const fetchData = async() => {
        try{
            const response = await fetch('http://localhost:8080/writeToPort', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 0x22, // simulink reads 0x22 as read mode
                    modeVal: 'VOO', // state has to be wrapped in curly braces to send properly
                }),
            });
            // wait for successful response from backend
            if(!response.ok){throw Error(response.statusText);};
            const json = await response.json()
            // set graph values from corresponding bytes
            setValues([json[0], json[1]]);
            // set values for other parameters from corresponding bytes
            document.getElementById('LRL').value = json[6];
            document.getElementById('URL').value = json[12];
            document.getElementById('Vamp').value = json[5];
            document.getElementById('VPW').value = json[7];
        }
        catch (err) {
            console.log(err);
        }
    }

    /*
    read and write functions for buttons. Once the user clicks on either
    of these buttons the app state is changed to either read or write.
    Once it's in read mode, it fetches data then continously reads data real
    time from the serial communication.
    */
    const read = ()=>{
        setRead(true);
        fetchData(); // first time
        toggle(); // show graph
    }

    const write = ()=>{
        setRead(false);
        fetch('http://localhost:8080/writeToPort', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 0x55, // simulink reads 0x55 as write
                modeVal: 'VOO',
                LRL: document.getElementById("LRL").value,
                URL: document.getElementById("URL").value,
                Vamp: document.getElementById("Vamp").value,
                VPW: document.getElementById("VPW").value,
            }),
        })
        .catch((err) => console.log(err))
    }

    const updateLRL = () => {
        parameters['lrl'] = document.getElementById('LRL').value;
        setParameters(parameters);
        lrlData = {
            datasets: [{
                labels: ['1', '2'],
                data: [parameters['lrl'], (170-parameters['lrl'])],
                fill: true,
                backgroundColor: ['rgb(107, 186, 255)', 'rgb(199, 199, 199)'],
            }]
        }
    }

    const updateURL = () => {
        parameters['url'] = document.getElementById('URL').value;
        setParameters(parameters);
        urlData = {
            datasets: [{
                labels: ['1', '2'],
                data: [parameters['url'], (175-parameters['url'])],
                fill: true,
                backgroundColor: ['rgb(107, 186, 255)', 'rgb(199, 199, 199)'],
            }]
        }
    }
    
    const updateVentAmp = () => {
        parameters['ventAmp'] = document.getElementById('Vamp').value;
        setParameters(parameters);
        ventAmpData = {
            datasets: [{
                labels: ['1', '2'],
                data: [parameters['ventAmp'], (5-parameters['ventAmp'])],
                fill: true,
                backgroundColor: ['rgb(107, 186, 255)', 'rgb(199, 199, 199)'],
            }]
        }
    }

    const updateVentPW = () => {
        parameters['ventPW'] = document.getElementById('VPW').value;
        setParameters(parameters);
        ventPWData = {
            datasets: [{
                labels: ['1', '2'],
                data: [parameters['ventPW'], (30-parameters['ventPW'])],
                fill: true,
                backgroundColor: ['rgb(107, 186, 255)', 'rgb(199, 199, 199)'],
            }]
        }
    }

    return (
        // min and max from Pacemaker document; step is the incremental value
        <div>
            <br></br>
            <h3>Programmable Parameters</h3>
            <br></br>
            <Row style={{width: '80vw'}}>
                <Col>
                    <h5>Lower Rate Limit (ppm)</h5>
                    <div style={{height: '180px', marginBottom: '15px'}}>
                        <Doughnut 
                            data={lrlData}
                            height={80}
                            options={{ maintainAspectRatio: false ,
                                elements: {
                                arc: {
                                    borderWidth: 0
                                    }
                                },
                                // circumference: Math.PI,
                                // rotation: Math.PI
                            }}
                        />
                    </div>
                    <input onChange={()=>updateLRL()} className='inputField' id = "LRL" type='number' min='30' max='170' step='5'></input>
                </Col>
                
                <Col style={{marginLeft: '-300px'}}>
                    <h5>Upper Rate Limit (ppm)</h5>
                    <div style={{height: '180px', marginBottom: '15px'}}>
                        <Doughnut 
                            data={urlData}
                            height={80}
                            options={{ maintainAspectRatio: false ,
                                elements: {
                                arc: {
                                    borderWidth: 0
                                    }
                                }
                            }}
                        />
                    </div>
                    <input onChange={()=>updateURL()} className='inputField' id="URL" type='number' min='50' max='175' step ='5'></input>
                </Col>
            </Row>
            <br></br>
            <Row style={{width: '80vw'}}>
                <Col>
                <h5>Ventricular Amplitude (V)</h5>
                <div style={{height: '100px', marginBottom: '15px'}}>
                    <Doughnut 
                        data={ventAmpData}
                        height={80}
                        options={{ maintainAspectRatio: false ,
                            elements: {
                            arc: {
                                borderWidth: 0
                                }
                            },
                            circumference: Math.PI,
                            rotation: Math.PI
                        }}
                    />
                </div>
                <input onChange={()=>updateVentAmp()} className='inputField' id="Vamp" type='number' min='0' max='5' step='0.1'></input>
                
                </Col>
                <Col style={{marginLeft: '-300px'}}>
                <h5>Ventricular Pulse Width (ms)</h5>
                <div style={{height: '100px', marginBottom: '15px'}}>
                    <Doughnut 
                        data={ventPWData}
                        height={80}
                        options={{ maintainAspectRatio: false ,
                            elements: {
                            arc: {
                                borderWidth: 0
                                }
                            },
                            circumference: Math.PI,
                            rotation: Math.PI
                        }}
                    />
                </div>
                <input onChange={()=>updateVentPW()} className='inputField' id="VPW" type='number' min='0.1' max='30' step='0.1'></input>
                </Col>
            </Row>
            
            <br></br>
            
            <h3 style={{margin: '20px'}}>Pacemaker E-Grams</h3>
            <div className='btnPanel'>
                <Button className='IOBtn' variant="secondary" onClick={read}>Read</Button>
                <Button className='IOBtn' variant="secondary" onClick={write}>Write</Button>
            </div>
            
            <Modal
                isShowing={isShowing}
                hide={toggle}
                values = {graphValues}
            />
        </div>
    );
}

export default VOO;