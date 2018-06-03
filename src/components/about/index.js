import React from 'react';

export default class About extends React.Component {
  render() {
    return (
      <section class="section">
        <div className="container">
          <div className="column">
            <div className="content about">
              <h1 className="title">CS PhD Opportunity Cost</h1>
              <p>
              The <a href="https://www.nsf.gov/statistics/2018/nsf18304/data/tab31.pdf">National Science Foundation</a> reports that the median time to receive a computer science doctorate after a bachelor's degree is 7.9 years. In recent times, fewer PhD graduates are following the tenure-track faculty route (for a variety of reasons) and are instead choosing software engineering positions. It's possible that the doctorate may not increase a software engineer's compensation to the point of making up for the lost wages incurred during their graduate studies. Doctoral stipends are usually enough to cover living expenses, but are nowhere near the compensation that an entry-level software engineer would receive. By pursuing a PhD and receiving a doctoral stipend, a graduate student who intends to work as a software engineer after their degree might end up missing out on hundreds of thousands of dollars of earnings.
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
                However, maximizing income should be not among the reasons to obtain a computer science doctorate.
              </p>
              <hr />
              <p>
                This calculator is not meant to be a hyper-accurate method to account for every aspect of earned income. It is only meant to be used to give a rough idea of what it looks like to pursue a PhD instead of directly heading to the industry after a bachelor's.
              </p>
              <p>
                The code running this page is open source and is located at <a href="https://github.com/ledif/cs-phd-oc">ledif/cs-phd-oc</a>.
              </p>
            </div>
          </div>
        </div>
      </section>   
    )
  }
}