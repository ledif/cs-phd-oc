import React from 'react';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral'

export default class EarningsChart extends React.Component {
    render() {
      let years = []
      for (var i = 0; i < this.props.swe.length; i++) { years.push("Year " + (i+1)) }
  
      const data = {
        labels: years,
        datasets: [
          {
            label: 'SWE',
            fill: 'false',
            lineTension: 0.1,
            borderColor: "hsl(141, 71%, 48%)",
            backgroundColor: "hsl(141, 71%, 48%)",
            data: this.props.swe
          }, {
            label: 'Grad School',
            fill: 'false',
            borderColor: "hsl(204, 86%, 53%)",
            backgroundColor: "hsl(204, 86%, 53%)",
            lineTension: 0.1,
            data: this.props.phd
          }
        ]
      };
  
      const options = {
          scales: {
              xAxes: [{gridLines: {display: false}}],
              yAxes: [
                  {
                    gridLines: {display: false},
                      ticks: {
                          callback: function(label, index, labels) {
                              return numeral(label).format('($0.0a)');
                          }
                      }
                  }
              ]
          },
          tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';
  
                    if (label) {
                        label += ': ';
                    }
                    label += numeral(tooltipItem.yLabel).format('$0,0');
                    return label;
                }
            }
        }
      };
  
      return (
        <Line data={data} options={options} />
      );
    }
  }
  