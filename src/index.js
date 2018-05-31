import React from 'react';
import ReactDOM from 'react-dom';
import {Line} from 'react-chartjs-2';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import numeral from 'numeral'


import 'bulma/css/bulma.css'
import './index.css';



function salary(years, starting, raise) {
  let arr = Array(years).fill(starting);

  for (let i = 1; i < years; i++) {
    arr[i] = arr[i-1] * (1 + raise/100);
  }

  var partialSum = arr.reduce(function(r, a) {
  r.push((r.length && r[r.length - 1] || 0) + a);
  return r;
}, []);

  return partialSum
}

class SalaryChart extends React.Component {
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


var options = {
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
    }
}

    return (
        <Line data={data} options={options} />
    );
  }
}


class PhD extends React.Component {
  constructor(props) {
    super(props);
    this.state = { numYears: 6, stipend: 24000, startingCompensation: 100000, raise: 3 };
  }

  updateNumYears(years) {
    this.setState((prevState, props) => {
      return {numYears: years}
    });
  }

  updateStipend(stipend) {
    this.setState((prevState, props) => {
      return {stipend: stipend}
    });
  }

  updateStarting(starting) {
    this.setState((prevState, props) => {
      return {startingCompensation: starting}
    });
  }

  updateRaise(raise) {
    this.setState((prevState, props) => {
      return {raise: raise}
    });
  }

  render() {
    const years = this.state.numYears
    const phd = salary(years, this.state.stipend, 2)
    const swe = salary(years, this.state.startingCompensation, this.state.raise)
  
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
  
    const lostIncome = numeral(swe[years-1] - phd[years-1]).format('$0,0')

    const stipend = numeral(this.state.stipend).format('($0a)');
    const starting = numeral(this.state.startingCompensation).format('($0a)');

    return (
    <section className="hero is-fullheight">
      <div className="hero-body">
      <div className="container">
        <div className="columns">
          <div className="column is-4 box">
            <div className="content">
              <h2>{lostIncome} lost</h2>
              <p>Nobody goes into a Computer Science PhD program for the money. But it's often understated just how much you're giving up by pursuing a PhD instead of following the traditional software engineering route.</p>
              <hr />

              <div className="columns">
                <div className="column is-4"><p>{this.state.numYears} years</p></div>
                <div className="column"><Slider min={4} max={10} defaultValue={this.state.numYears} onChange={(value) => this.updateNumYears(value)} /></div>
              </div>

              <div className="columns">
                <div className="column is-4"><p>{stipend} stipend</p></div>
                <div className="column"><Slider min={20000} max={35000} defaultValue={this.state.stipend} step={1000} onChange={(value) => this.updateStipend(value)} /></div>
              </div>


              <div className="columns">
                <div className="column is-4"><p>{starting} starting</p></div>
                <div className="column"><Slider min={70000} max={200000} defaultValue={this.state.startingCompensation} step={2000} onChange={(value) => this.updateStarting(value)} /></div>
              </div>

              <div className="columns">
                <div className="column is-4"><p>{this.state.raise}% yearly raise </p></div>
                <div className="column"><Slider min={0} max={5} defaultValue={this.state.raise} step={1} onChange={(value) => this.updateRaise(value)} /></div>
              </div>
           </div>
         </div>

          <div className="column">
            <SalaryChart swe={swe} phd={phd} />
          </div>
        </div>
      </div>

    </div>
    </section>
    );
  }
}

// ========================================

ReactDOM.render(
  <PhD />,
  document.getElementById('root')
);

