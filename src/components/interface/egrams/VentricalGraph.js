import React, {useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import '../../../stylesheets/EgramPanel.css';

const VentricalGraph = () => {
    const [chartData, setChartData] = React.useState({});

    var testLabels = [1,2,3,4,5,6,7,8];

    // fetch data from firebase - filled with temporary data for now
    const chart = () => {
        setChartData({
            labels: testLabels,
            datasets: [{
                label: 'Atrial',
                fill: false,
                data: [],
                backgroundColor: 'rgb(21, 120, 191)',
                borderColor: 'rgba(21, 120, 191,0.7)',
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
                        type: "realtime",
                        realtime: {
                        onRefresh: function() {
                            chartData.datasets[0].data.push({
                            x: Date.now(),
                            y: Math.random() * 100
                            });
                        },
                        delay: 2000
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

export default VentricalGraph;