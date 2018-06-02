import React from 'react';
import {Line} from 'react-chartjs-2';
import numeral from 'numeral'


function partialSum(arr) {
  return arr.reduce((r, a) => {
    r.push(((r.length && r[r.length - 1]) || 0) + a);
    return r;
   }, []
  );
}

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
            data: partialSum(this.props.swe)
          }, {
            label: 'Grad School',
            fill: 'false',
            borderColor: "hsl(204, 86%, 53%)",
            backgroundColor: "hsl(204, 86%, 53%)",
            lineTension: 0.1,
            data: partialSum(this.props.phd)
          }
        ]
      };

      const incomes = [this.props.swe, this.props.phd]

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
                  const income = incomes[tooltipItem.datasetIndex][tooltipItem.index]

                  const incomeString = "Yearly: " + numeral(income).format('$0,0')
                  const earningsString = "Total: " + numeral(tooltipItem.yLabel).format('$0,0');

                  return [earningsString, incomeString];
                }
            }
        }
      };
  
      return (
        <Line data={data} options={options} />
      );
    }
  }
  