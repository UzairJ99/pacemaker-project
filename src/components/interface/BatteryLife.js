import React, {useEffect} from 'react';
import {Line} from 'react-chartjs-2';

const BatteryLife = () => {
    const chartData = (canvas) => {
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        gradient.addColorStop(0, 'rgba(155,234,102,1)');   
        gradient.addColorStop(1, 'rgba(155,234,102,0)');

        return {
            labels: [0,1,2,3,4,5,6,7,8,9],
            datasets:[{
                label: 'Max Battery Life',
                data: [100, 100, 100, 99, 99, 98, 98, 98, 98, 98, 95],
                backgroundColor: gradient
            }]
        }
    }

    return (
        <div>
            <Line 
                data={chartData}
                options={{ 
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Weeks of Device Use'
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: '% of Original Life'
                            },
                            ticks: {
                                max: 100,
                                stepSize: 1
                            }
                        }]
                    }
                }}
            />
        </div>
    )
}

export default BatteryLife;