import React, { Component, Fragment } from "react";

import "./MonthDays.scss";

export class MonthDays extends Component {
  constructor(props) {
    super(props);

    this.state = {
      daysInCurrentMonth: null,
      daysElements: null,
      currentDay: null
    };
  }

  

  componentDidMount() {
        
  }

  render() {
    return (
      <div className="calendar__days">
        {
          this.props.days
          && this.props.days.map((el, i) => {
            return el
          })
        }
      </div>
    );
  }
}
