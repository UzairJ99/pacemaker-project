/*
This panel will control which egram to display and will provide
options to view Atrial, Ventricular, or both graphs
as well as a print option.
*/

import React from 'react';
import Button from 'react-bootstrap/Button';
import '../../stylesheets/EgramPanel.css';

const EgramPanel = () => {
    const [mode, setMode] = React.useState('atrial');

    function renderGraph(modeVal) {
        switch(modeVal) {
            case 'atrial':
                return <h1>atrial graph goes here</h1>;
            case 'ventricular':
                return <h1>ventricular graph goes here</h1>;
            case 'both':
                return <h1>both graphs go here</h1>;
            default:
                return <h1>yes</h1>;
        }
        
    }

    return (
        <div className='graphModeSelector'>
            <span style={{display: 'block', maxWidth: '100px', 'minHeight': '45vh', position: 'absolute'}}>
                <Button variant='secondary' className='graphBtn' onClick={() => {setMode('atrial')}} active={mode === 'atrial' ? true : false}>Atrial</Button>
                <Button variant='secondary' className='graphBtn' onClick={() => {setMode('ventricular')}} active={mode === 'ventricular' ? true : false}>Ventricular</Button>
                <Button variant='secondary' className='graphBtn' onClick={() => {setMode('both')}} active={mode === 'both' ? true : false}>Dual View</Button>
            </span>
            {
                renderGraph(mode)
            }
        </div>
    )
}

export default EgramPanel;