import React, { Component, Fragment } from "react";

import "./WeekDays.scss";

export class WeekDays extends Component {
  constructor(props) {
    super();

    this.state = {
      weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    };
  }

  render() {
    return (
      <div className="calendar__weekdays">
        {this.state.weekDays.map((el, i) => {
          return <div className="calendar__weekday" key={i}>{el}</div>;
        })}
      </div>
    );
  }
}
