import React, { Component, Fragment } from "react";

import { WeekDays } from "./WeekDays/WeekDays";
import { MonthDays } from "./MonthDays/MonthDays";

import "./CalendarBody.scss";

export class CalendarBody extends Component {
  constructor(props) {
    super();

    this.state = {
      currentDay: props.currentDay
    };
  }

  render() {
    return (
      <Fragment>
        <WeekDays />
        <MonthDays currentYear={this.props.currentYear} currentMonth={this.props.currentMonth} currentDay={this.state.currentDay} />
      </Fragment>
    );
  }
}
