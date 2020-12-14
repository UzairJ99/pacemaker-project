import React from 'react';
import BatteryLife from './BatteryLife';

const UtilityParameters = () => {
    return (
        <div>
            <p>Battery Life</p>
            <div  style={{height: '200px', width: '200px'}}>
                <BatteryLife />
            </div>
            
            <p>Application Model Number</p>
            <p><i>FRDM-SW3-INT2</i></p>
            <p>DCM Serial Number</p>
            <p><i>45532-69034-23</i></p>
            <p>Institution Name</p>
            <p><i>McMaster University</i></p>
        </div>
    )
}

export default UtilityParameters;