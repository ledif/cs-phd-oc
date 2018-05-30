import React from 'react';
import ReactDOM from 'react-dom';
import {Line} from 'react-chartjs-2';

import './index.css';


function googleSalary(years) {
  var BASE = 190854;
  //var BASE = 100000;
  var arr = [];
  let i = 0;
  for (i = 0; i < years; i++) {
    var prev = i == 0 ? BASE : arr[i-1]
    var thisYear = prev * 1.03
    arr.push(thisYear)
  }
  console.log(arr)
  var partialSum = arr.reduce(function(r, a) {
  r.push((r.length && r[r.length - 1] || 0) + a);
  return r;
}, []);
  return partialSum
}

function phdStipend(years) {
  var BASE = 20000;
  var arr = [];
  let i = 0;
  for (i = 0; i < years; i++) {
    var prev = i == 0 ? BASE : arr[i-1]
    var thisYear = prev * 1.03
    arr.push(thisYear)
  }
  console.log(arr)
  var partialSum = arr.reduce(function(r, a) {
  r.push((r.length && r[r.length - 1] || 0) + a);
  return r;
}, []);
  return partialSum
}

class SalaryChart extends React.Component {
  render() {

  const startYear = 2010;
  let years = []
  for (var i = startYear; i < startYear+this.props.google.length; i++) { years.push(i) }

const data = {
  labels: years,
  datasets: [
    {
      label: 'Google',
      fill: false,
      lineTension: 0.1,
      borderColor: "#3e95cd",
      data: this.props.google
    }, {
      label: 'Grad School',
      fill: false,
      borderColor: "#8e5ea2",
      lineTension: 0.1,
      data: this.props.phd
    }
  ]
};
    return (
        <Line data={data} />
    );
  }
}


class PhD extends React.Component {
  render() {

  const years = 8
  const phd = phdStipend(years)
  const google = googleSalary(years)

let formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

  const lostIncome = formatter.format(google[years-1] - phd[years-1])


    return (
      <div className="phd">
        <h1>Lost income: {lostIncome}</h1>
        <SalaryChart google={google} phd={phd} />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <PhD />,
  document.getElementById('root')
);

