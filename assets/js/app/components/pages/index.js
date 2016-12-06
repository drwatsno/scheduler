import React from "react";

class Index extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<div className="sch-b-content--default">
              <h1>Scheduler start</h1>

              <section className="sch-b_section">
                <h2>What is Scheduler?</h2>
                <p>
                  Scheduler is service aiming to become best solution for organizing meeting/conferences :)<br />
                  And yes - it's open source!<br />
                  Signup, and add your first event
                </p>
              </section>
            </div>)
  }
}
export default Index;
