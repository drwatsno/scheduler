import React, { PropTypes } from "react"
import { connect } from "react-redux"
import SchedulerCalendar from "../event/calendar"

class Index extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)
  }
  render() {
    const { auth } = this.props;
    if (auth.isAuthenticated) {
      return (<SchedulerCalendar events={[]} />)
    } else {
      return (<div className="sch-b-content--default">
        <h1>Scheduler start</h1>
        <section className="sch-b_section">
          <h2>What is Scheduler?</h2>
          <p>
            Scheduler is service aiming to become best solution for organizing meeting/conferences :)<br />
            And yes - it"s open source!<br />
            Signup, and add your first event
          </p>
        </section>
      </div>)
    }
  }
}
export default connect(state => ({
  auth: state.auth
}))(Index);

