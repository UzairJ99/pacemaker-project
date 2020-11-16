/*
This panel will control which egram to display and will provide
options to view Atrial, Ventricular, or both graphs
as well as a print option.
*/

import React from 'react';
import Button from 'react-bootstrap/Button';
import '../../stylesheets/EgramPanel.css';
// graph components
import AtrialGraph from './egrams/AtrialGraph';
import VentricalGraph from './egrams/VentricalGraph';

const EgramPanel = () => {
    const [mode, setMode] = React.useState('atrial');

    // fetch and import data from firebase here
    const getAtrialData = () => {
        return {
            labels: ['A', 'B', 'C'],
            datasets: [{
              label: 'My data',
              fill: false,
              data: [10, 20, 30],
              backgroundColor: '#112233'
            }]
        }
    }
    // separate for atrial and ventricular (fetch both however)

    function renderGraph(modeVal) {
        switch(modeVal) {
            case 'atrial':
                return <AtrialGraph />;
            case 'ventricular':
                return <VentricalGraph />;
            case 'both':
                return <h1>both graphs go here</h1>;
            default:
                return <AtrialGraph />;
        }
        
    }

    return (
        <div className='graphModeSelector'>
            <span style={{display: 'block', maxWidth: '100px', 'minHeight': '45vh', position: 'absolute'}}>
                <Button variant='secondary' className='graphBtn' onClick={() => {setMode('atrial')}} active={mode === 'atrial' ? true : false}>Atrial</Button>
                <Button variant='secondary' className='graphBtn' onClick={() => {setMode('ventricular')}} active={mode === 'ventricular' ? true : false}>Ventricular</Button>
                <Button variant='secondary' className='graphBtn' onClick={() => {setMode('both')}} active={mode === 'both' ? true : false}>Dual View</Button>
            </span>
            <div style={{height: '50vh', left: '50px'}} >
            {
                renderGraph(mode)
            }
            </div>
            
        </div>
    )
}

export default EgramPanel;