import React, { Component, Fragment } from "react";

import "./MonthDays.scss";

export class MonthDays extends Component {
  constructor(props) {
    super();

    this.state = {
      currentYear: props.currentYear,
      currentMonth: props.currentMonth,
      currentDay: props.currentDay,
      daysInMonths: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      daysInCurrentMonth: null,
      daysElements: null
    };
  }

  daysInCurrentMonth = () => {
    this.setState({
      daysInCurrentMonth: this.state.daysInMonths[this.state.currentMonth - 1]
    }, (() => {
      var daysElements = [];
      for (let i = 0; i < this.state.daysInCurrentMonth; i++) {
        const day = ((new Date(`${this.state.currentYear}-${this.state.currentMonth}-${i+1}`).getDay() + 6) % 7);

        if(i === 0) {
          console.log(day);
          for(let j = day; j > 0; j--) {
            daysElements.push(<div key={0 - j} className="calendar__day"></div>)
          }
        }
        
        if(i + 1 === this.state.currentDay){
          daysElements.push(<div key={i} className="calendar__day calendar__day--currentMonth calendar__day--currentDay">{i + 1}</div>)
        } else {
          daysElements.push(<div key={i} className="calendar__day calendar__day--currentMonth">{i + 1}</div>)
        }
      }

      this.setState({
        daysElements: daysElements
      })
    }))
  }

  setDaysInMonth = () => {
    if(this.state.currentYear % 4 === 0){
      this.setState({
        daysInMonths: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      }, (() => {
        this.daysInCurrentMonth();
      }))
    } else {
      this.daysInCurrentMonth();
    }
  }

  componentDidMount() {
    this.setDaysInMonth();
  }

  render() {
    return (
      <div className="calendar__days">
        {
           this.state.daysElements
            && this.state.daysElements.map((el, i) => {
              return el
            })
        }
      </div>
    );
  }
}
