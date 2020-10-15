/*
This navbar component will let the user select which pacing mode interface to display on the page.
It will control rendering the view
*/
import React from 'react';
import '../../stylesheets/PaceMode.css';
import Button from 'react-bootstrap/Button';

const PaceMode = () => {

    const [mode, setMode] = React.useState('VOO');

    function renderInterface (modeVal) {
        switch(modeVal) {
            case 'VOO': 
                return <h2>{mode} Interface Goes Here</h2>;
            case 'VVI':
                return <h2>{mode} Interface Goes Here</h2>;
            case 'AOO':
                return <h2>{mode} Interface Goes Here</h2>;
            case 'AAI':
                return <h2>{mode} Interface Goes Here</h2>;
            default:
                return <h2>{mode} Interface Goes Here</h2>;
        }
    }

    return (
        <div className='paceModeSelector'>
            <span style={{display: 'flex', minWidth: '100%'}}>
                <Button variant='secondary' className='paceBtn' onClick={() => {setMode('VOO')}} active={mode == 'VOO' ? true : false}>VOO</Button>
                <Button variant='secondary' className='paceBtn' onClick={() => {setMode('VVI')}} active={mode == 'VVI' ? true : false} >VVI</Button>
                <Button variant='secondary' className='paceBtn' onClick={() => {setMode('AOO')}} active={mode == 'AOO' ? true : false} >AOO</Button>
                <Button variant='secondary' className='paceBtn' onClick={() => {setMode('AAI')}} active={mode == 'AAI' ? true : false} >AAI</Button>
            </span>
            {/* interface panel will use a switch to decide which component to render based on state. */
                renderInterface(mode)            
            }
        </div>
    );
}

export default PaceMode;