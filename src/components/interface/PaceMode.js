/*
This navbar component will let the user select which pacing mode interface to display on the page.
It will control rendering the view
*/
import React, {useEffect} from 'react';
import '../../stylesheets/PaceMode.css';
import Button from 'react-bootstrap/Button';
// components
import AOO from './AOO';
import AAI from './AAI';
import VOO from './VOO';
import VVI from './VVI';
import VVIR from './VVIR';
import VOOR from './VOOR';
import AOOR from './AOOR';
import AAIR from './AAIR';
import DOO from './DOO';
import DOOR from './DOOR';

const PaceMode = () => {

    const [mode, setMode] = React.useState('VOO');
    
    /*
    make call to backend API writeToPort POST request.
    Pass in the state into the body in JSON format.
    Request is processed in serialcomm.js and information is 
    then sent to the FRDM.
    */
    
    // determine which mode to display on the UI
    function renderInterface (modeVal) {
        switch(modeVal) {
            case 'VOO': 
                return <VOO />;
            case 'VVI':
                return <VVI />;
            case 'AOO':
                return <AOO />;
            case 'AAI':
                return <AAI />;
            case 'VOOR':
                return <VOOR />;
            case 'VVIR':
                return <VVIR />;
            case 'AOOR':
                return <AOOR />;
            case 'AAIR':
                return <AAIR />;
            case 'DOO':
                return <DOO />;
            case 'DOOR':
                return <DOOR />;
            default:
                return <h2>{mode} Interface Goes Here</h2>;
        }
    }

    return (
        <div className='paceModeSelector'>
            <span style={{display: 'flex', minWidth: '100%'}}>
                <Button variant='secondary' className='paceBtn' onClick={() => {setMode('VOO')}} active={mode === 'VOO' ? true : false}>VOO</Button>
                <Button variant='secondary' className='paceBtn' onClick={() => {setMode('VVI')}} active={mode === 'VVI' ? true : false} >VVI</Button>
                <Button variant='secondary' className='paceBtn' onClick={() => {setMode('AOO')}} active={mode === 'AOO' ? true : false} >AOO</Button>
                <Button variant='secondary' className='paceBtn' onClick={() => {setMode('AAI')}} active={mode === 'AAI' ? true : false} >AAI</Button>
                <Button variant='secondary' className='paceBtn' onClick={() => {setMode('VOOR')}} active={mode === 'VOOR' ? true : false} >VOOR</Button>
                <Button variant='secondary' className='paceBtn' onClick={() => {setMode('VVIR')}} active={mode === 'VVIR' ? true : false} >VVIR</Button>
                <Button variant='secondary' className='paceBtn' onClick={() => {setMode('AOOR')}} active={mode === 'AOOR' ? true : false} >AOOR</Button>
                <Button variant='secondary' className='paceBtn' onClick={() => {setMode('AAIR')}} active={mode === 'AAIR' ? true : false} >AAIR</Button>
                <Button variant='secondary' className='paceBtn' onClick={() => {setMode('DOO')}} active={mode === 'DOO' ? true : false} >DOO</Button>
                <Button variant='secondary' className='paceBtn' onClick={() => {setMode('DOOR')}} active={mode === 'DOOR' ? true : false} >DOOR</Button>
            </span>
            {/* interface panel will use a switch to decide which component to render based on state. */
                renderInterface(mode)            
            }
        </div>
    );
}

export default PaceMode;