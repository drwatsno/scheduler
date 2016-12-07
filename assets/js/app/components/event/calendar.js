import React from "react"
import BigCalendar from "react-big-calendar"
import moment from "moment"

class SchedulerCalendar extends React.Component {
  constructor(props) {
    super(props);
    BigCalendar.momentLocalizer(moment);
  }

  render() {
    return (<div className="sch-b-content--calendar">
              <BigCalendar
                events={this.props.events}
                startAccessor="startDate"
                endAccessor="endDate"
                timeslots={2}
              />
            </div>)
  }
}

export default SchedulerCalendar
