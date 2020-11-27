import React, {useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import '../../../stylesheets/EgramPanel.css';
import "chartjs-plugin-streaming";

const AtrialGraph = (props) => {
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
                backgroundColor: 'rgb(156, 37, 37)',
                borderColor: 'rgba(156, 37, 37,0.7)',
                borderWidth: 4
            }]
        })
    }

    // update data here
    useEffect(() => {
        chart(testLabels)
    }, [])

    return (
        <div>
            <Line data={chartData} 
                height={props.height}
                width={props.width}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [ {
                        type: "realtime",
                        realtime: {
                        onRefresh: function() {
                            chartData.datasets[0].data.push({
                            x: Date.now(), // time
                            y: Math.random() * 5 // one single point
                            });
                        },
                        delay: 1000
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

export default AtrialGraph;