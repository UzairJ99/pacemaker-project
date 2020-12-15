import React, {useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import '../../../stylesheets/EgramPanel.css';

const VentricalGraph = (props) => {
    const [chartData, setChartData] = React.useState({});

    var testLabels = [1,2,3,4,5,6,7,8];

    var dataPoints = (props.dataPoints)*3.3;
    console.log(dataPoints);

    // fetch data from firebase - filled with temporary data for now
    const chart = () => {
        setChartData({
            labels: testLabels,
            datasets: [{
                label: 'Ventrical',
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
        <div style={{marginLeft: '250px'}}>
            <Line data={chartData} 
                height ={props.height}
                width={props.width}
                options={{
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        xAxes: [ {
                        type: "realtime",
                        realtime: {
                        onRefresh: function() {
                            chartData.datasets[0].data.push({
                            x: Date.now(),
                            y: dataPoints
                            });
                        },
                        delay: 1,
                        },
                        ticks: {
                            major: {
                            fontStyle: 'bold',
                            fontColor: '#303030'
                            }
                        }
                        } ],
                        yAxes: [ {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Volts'
                        },
                        ticks: {
                            max: 5,
                            stepSize: 1
                        }
                        } ]
                    }
                }}/>
        </div>
    )
}

export default VentricalGraph;