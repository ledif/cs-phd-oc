import React from 'react';
import ReactDOM from 'react-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import numeral from 'numeral'
import { HashRouter, Route, Switch, NavLink } from 'react-router-dom'


import About from './components/about'
import EarningsChart from './components/earnings-chart'
import { salary, lostString } from './lib/earnings'

import 'bulma/css/bulma.css'
import './index.css';


class DuringDegree extends React.Component {
  render() {
    const years = this.props.numYears
    const stipend = numeral(this.props.stipend).format('($0a)');
    const starting = numeral(this.props.startingCompensation).format('($0a)');

    return (
      <div>
          <h2 id="lost-income">{lostString(this.props.phd, this.props.swe)}</h2>
          <p>People don't enter a computer science PhD program for the money. But it's often understated how much a doctoral student is giving up by pursuing a PhD instead of following the traditional software engineering route.</p>

          <hr />

          <nav className="level">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">Doctorate</p>
              </div>
            </div>
          </nav>

          <div className="columns">
            <div className="column is-4 slider-label"><p>{years} years</p></div>
            <div className="column"><Slider min={4} max={10} defaultValue={years} onChange={(value) => this.props.updateNumYears(value)} /></div>
          </div>

          <div className="columns">
            <div className="column is-4 slider-label"><p>{stipend} stipend</p></div>
            <div className="column"><Slider min={20000} max={35000} defaultValue={this.props.stipend} step={1000} onChange={(value) => this.props.updateStipend(value)} /></div>
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
            <div className="column"><Slider min={70000} max={250000} defaultValue={this.props.startingCompensation} step={2000} onChange={(value) => this.props.updateStarting(value)} /></div>
          </div>

          <div className="columns">
            <div className="column is-4 slider-label"><p>{this.props.raise}% yearly raise </p></div>
            <div className="column"><Slider min={0} max={5} defaultValue={this.props.raise} step={1} onChange={(value) => this.props.updateRaise(value)} /></div>
          </div>
      </div>
    );
  }
}



class AfterDegree extends React.Component {
  render() {
    const starting = numeral(this.props.postDocStartingCompensation).format('($0a)');

    return (
      <div>
          <h2 id="lost-income">{lostString(this.props.phd, this.props.swe)}</h2>
          <p>After earning a doctorate, it is possible to fall short of the alternate version of you that did not pursue a PhD.</p>
          <hr />

          <nav className="level">
            <div className="level-item has-text-centered">
              <div>
                <p className="heading">After Degree</p>
              </div>
            </div>
          </nav>

          <div className="columns">
            <div className="column is-4 slider-label"><p>{this.props.numPostDocYears} years</p></div>
            <div className="column"><Slider min={10} max={40} defaultValue={this.props.numPostDocYears} onChange={(value) => this.props.updateNumPostDocYears(value)} /></div>
          </div>

          <div className="columns">
          <div className="column is-4 slider-label"><p>{starting} starting</p></div>
            <div className="column"><Slider min={70000} max={300000} defaultValue={this.props.postDocStartingCompensation} step={2000} onChange={(value) => this.props.updatePostDocStarting(value)} /></div>
          </div>

          <div className="columns">
            <div className="column is-4 slider-label"><p>{this.props.postDocRaise}% yearly raise </p></div>
            <div className="column"><Slider min={0} max={5} defaultValue={this.props.postDocRaise} step={1} onChange={(value) => this.props.updatePostDocRaise(value)} /></div>
          </div>

      </div>
    );
  }
}

class PhD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duringDegree: true,
      numYears: 6,
      stipend: 24000,
      startingCompensation: 100000,
      raise: 3,
      postDocStartingCompensation: 120000,
      numPostDocYears: 30,
      postDocRaise: 3
    };
  }

  updateNumYears(years) {
    this.setState((prevState, props) => {
      return {numYears: years}
    });
  }

  updateNumPostDocYears(years) {
    this.setState((prevState, props) => {
      return {numPostDocYears: years}
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


  updatePostDocStarting(starting) {
    this.setState((prevState, props) => {
      return {postDocStartingCompensation: starting}
    });
  }

  updateRaise(raise) {
    this.setState((prevState, props) => {
      return {raise: raise}
    });
  }


  updatePostDocRaise(raise) {
    this.setState((prevState, props) => {
      return {postDocRaise: raise}
    });
  }

  toggleBeforeAfter() {
    this.setState((prevState, props) => {
      return {duringDegree: !prevState.duringDegree}
    });  
  }

  render() {

    let phd = []
    let swe = []

    if (this.state.duringDegree) {
      const years = this.state.numYears
      phd = salary(years, this.state.stipend, 2)
      swe = salary(years, this.state.startingCompensation, this.state.raise)
    } else {
      swe = 
        salary(this.state.numYears + this.state.numPostDocYears, this.state.startingCompensation, this.state.raise)

      const duringDegreeSalary = salary(this.state.numYears, this.state.stipend, 2)
      const afterDegreeSalary = salary(this.state.numPostDocYears, this.state.postDocStartingCompensation, this.state.postDocRaise)
      phd = duringDegreeSalary.concat(afterDegreeSalary)
    }

    const Sliders = this.state.duringDegree ? 
      <DuringDegree
        numYears={this.state.numYears}
        stipend={this.state.stipend}
        startingCompensation={this.state.startingCompensation}
        raise={this.state.raise}
        updateNumYears={this.updateNumYears.bind(this)}
        updateStipend={this.updateStipend.bind(this)}
        updateStarting={this.updateStarting.bind(this)}
        updateRaise={this.updateRaise.bind(this)}
        phd={phd}
        swe={swe}
    /> :
      <AfterDegree
        numYears={this.state.numYears}
        numPostDocYears={this.state.numPostDocYears}
        postDocStartingCompensation={this.state.postDocStartingCompensation}
        postDocRaise={this.state.postDocRaise}
        updateNumPostDocYears={this.updateNumPostDocYears.bind(this)}
        updatePostDocStarting={this.updatePostDocStarting.bind(this)}
        updatePostDocRaise={this.updatePostDocRaise.bind(this)}
        phd={phd}
        swe={swe}
      />

    const beforeAfter = this.state.duringDegree ? "After" : "Before";


    return (
      <div>
        <div className="columns">
          <div className="column is-4 box">
            <div className="content">
              {Sliders}
              <hr />

              <div className="has-text-centered">
                <a className="button is-success"
                  onClick={this.toggleBeforeAfter.bind(this)}>
                  {beforeAfter} Graduation
                </a>
              </div>

            </div>
          </div>

          <div id="salary-chart" className="column">
            <EarningsChart swe={swe} phd={phd} />
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <Switch>
              <Route exact path='/' component={PhD}/>
              <Route path='/about' component={About}/>
            </Switch>
          </div>
        </div>
        <div className="hero-foot">
          <nav className="tabs">
            <div className="container">
              <ul>
                <li><NavLink to="/" exact className="navbar-item" activeClassName="is-active">Home</NavLink></li>
                <li><NavLink to="/about" exact className="navbar-item" activeClassName="is-active">About</NavLink></li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    )
  }
}

// ========================================

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById('root')
);
