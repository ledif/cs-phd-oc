import React from 'react';
import ReactDOM from 'react-dom';
import {Line} from 'react-chartjs-2';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import numeral from 'numeral'


import 'bulma/css/bulma.css'
import './index.css';


function salary(years, starting, raise) {
  let arr = Array(years).fill(starting);

  // Compute income each year based on raise
  for (let i = 1; i < years; i++) {
    arr[i] = arr[i-1] * (1 + raise/100);
  }

  // Compute the partial sum of the income per year
  return arr.reduce((r, a) => {
    r.push(((r.length && r[r.length - 1]) || 0) + a);
    return r;
   }, []
  );
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
        }
    };

    return (
        <Line data={data} options={options} />
    );
  }
}

class About extends React.Component {
  render() {
    return (
      <section class="section">
      <div className="container">
        <div className="column">
            <div className="content about">
                <h1 className="title">CS PhD Opportunity Cost</h1>
                <p>
                The <a href="https://www.nsf.gov/statistics/2018/nsf18304/data/tab31.pdf">National Science Foundation</a> reports that the median time to receive a computer science doctorate after a bachelor's degree is 7.9 years. In recent times, fewer PhD graduates are following the tenure-track faculty route (for a variety of reasons) and are instead choosing software engineering positions. The doctorate itself typically does not increase a software engineer's compensation to the point of making up for the lost wages incurred during their graduate studies. Doctoral stipends are often enough to cover living expenses, but are nowhere near the compensation that an entry-level software engineer would receive. By pursuing a PhD and receiving a doctoral stipend, a graduate student who intends to work as a software engineer after their degree would end up missing out on hundreds of thousands of dollars of income.
                </p>
                <p>
                  There are many reasons to pursue a PhD:
                </p>
                <ul>
                  <li>Become a world-class expert on your dissertation topic</li>
                  <li>Train to become a scientist and a researcher</li>
                  <li>Prepare for a career in academia</li>
                </ul>
                <p>
                  However, getting rich is not among the reasons to obtain a doctorate.
                </p>
                <hr />
                <p>
                  This calculator is not meant to be a hyper-accurate method to account for every aspect of earned income. It is only meant to be used to give a rough idea of what it looks like to pursue a PhD instead of directly heading to the industry after a bachelor's.
                </p>
                <p>
                  The code running this website is open source at <a href="https://github.com/ledif/cs-phd-oc">ledif/cs-phd-oc</a>.
                </p>
            </div>
          </div>
      </div>
    </section>   
    )
  }
}

class PhD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numYears: 6,
      stipend: 24000,
      startingCompensation: 100000,
      raise: 3 
    };
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

  
    const lostIncome = numeral(swe[years-1] - phd[years-1]).format('$0,0')

    const stipend = numeral(this.state.stipend).format('($0a)');
    const starting = numeral(this.state.startingCompensation).format('($0a)');

    return (
    <div>
      <section className="hero is-fullheight">
        <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column is-4 box">
              <div className="content">
                <h2 id="lost-income">{lostIncome} lost</h2>
                <p>Nobody goes into a computer science PhD program for the money. But it's often understated just how much you're giving up by pursuing a PhD instead of following the traditional software engineering route.</p>

                <hr />

                <nav className="level">
                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">Doctorate</p>
                    </div>
                  </div>
                </nav>

                <div className="columns">
                  <div className="column is-4 slider-label"><p>{this.state.numYears} years</p></div>
                  <div className="column"><Slider min={4} max={10} defaultValue={this.state.numYears} onChange={(value) => this.updateNumYears(value)} /></div>
                </div>

                <div className="columns">
                  <div className="column is-4 slider-label"><p>{stipend} stipend</p></div>
                  <div className="column"><Slider min={20000} max={35000} defaultValue={this.state.stipend} step={1000} onChange={(value) => this.updateStipend(value)} /></div>
                </div>

                <hr />


                <nav className="level">
                  <div className="level-item has-text-centered">
                    <div>
                      <p className="heading">Software Engineer</p>
                    </div>
                  </div>
                </nav>

                <div className="columns">
                  <div className="column is-4 slider-label"><p>{starting} starting</p></div>
                  <div className="column"><Slider min={70000} max={250000} defaultValue={this.state.startingCompensation} step={2000} onChange={(value) => this.updateStarting(value)} /></div>
                </div>

                <div className="columns">
                  <div className="column is-4 slider-label"><p>{this.state.raise}% yearly raise </p></div>
                  <div className="column"><Slider min={0} max={5} defaultValue={this.state.raise} step={1} onChange={(value) => this.updateRaise(value)} /></div>
                </div>

                <hr />
                <div className="has-text-centered">
                  <a className="button is-success">After Graduation</a>
                </div>

            </div>
          </div>

            <div id="salary-chart" className="column">
              <SalaryChart swe={swe} phd={phd} />
            </div>
          </div>
        </div>

      </div>


      </section>
      <About />
    </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <PhD />,
  document.getElementById('root')
);

