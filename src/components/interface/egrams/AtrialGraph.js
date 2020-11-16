import React, {useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import '../../../stylesheets/EgramPanel.css';

const AtrialGraph = () => {
    const [chartData, setChartData] = React.useState({});

    // fetch data from firebase - filled with temporary data for now
    const chart = () => {
        setChartData({
            labels: [1,2,3,4,5,6,7,8,9,10],
            datasets: [{
                label: 'Atrial',
                fill: false,
                data: [5,3,3,6,12,0,1,7,9,14],
                backgroundColor: 'rgb(156, 37, 37)',
                borderColor: 'rgba(156, 37, 37,0.7)',
                borderWidth: 4
            }]
        })
    }

    // update data here
    useEffect(() => {
        chart()
    }, [])

    return (
        <div>
            <Line data={chartData} 
                options={{
                    responsive: true,
                    scales: {
                        xAxes: [ {
                        type: 'time',
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Time'
                        },
                        ticks: {
                            major: {
                            fontStyle: 'bold',
                            fontColor: '#FF0000'
                            }
                        }
                        } ],
                        yAxes: [ {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'value'
                        }
                        } ]
                    }
                }}/>
        </div>
    )
}

export default AtrialGraph;