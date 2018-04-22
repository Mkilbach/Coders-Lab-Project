import React, { Component, Fragment } from "react";

import { CalendarHeader } from "./CalendarHeader/CalendarHeader";
import { CalendarBody } from "./CalendarBody/CalendarBody";

import "./Calendar.scss";

export class Calendar extends Component {
  constructor(props) {
    super();

    this.state = {
      currentDay: null,
      currentMonth: null,
      currentYear: null
    };
  }

  componentDidMount() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.setState({
      currentYear: year,
      currentMonth: month,
      currentDay: day,
      currentDate: `${year.toString()} - ${
          month.toString() < 10 
            ? "0" + month.toString()
            : month.toString()
        } - ${
          day.toString() < 10
            ? "0" + day.toString()
            : day.toString()
        }`
    });
  }

  render() {
    return (
      <div className="calendar">
        {
          (this.state.currentDay && this.state.currentMonth && this.state.currentYear)
            && (
            <Fragment>
              <CalendarHeader currentDay={this.state.currentDay} currentMonth={this.state.currentMonth} currentYear={this.state.currentYear} />
              <CalendarBody currentDay={this.state.currentDay} currentMonth={this.state.currentMonth} currentYear={this.state.currentYear}/>
            </Fragment>
            )
        }
      </div>
    );
  }
}
