import React, { Component, Fragment } from "react";

import "./CalendarHeader.scss";

export class CalendarHeader extends Component {
  constructor(props) {
    super();

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.state = {
      currentDay: props.currentDay,
      currentMonth: months[props.currentMonth - 1],
      visibleMonth: months[props.currentMonth - 1],
      currentYear: props.currentYear
    };
  }

  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <div className="calendar__header">
          <p>{this.state.currentYear}</p>
          <h1>{this.state.currentMonth}</h1>
        </div>
      </Fragment>
    );
  }
}
