import React, { Component, Fragment } from "react";

import { CalendarHeader } from "./CalendarHeader/CalendarHeader";
import { CalendarBody } from "./CalendarBody/CalendarBody";
import { DayInfo } from "./DayInfo/DayInfo";

import "./Calendar.scss";

export class Calendar extends Component {
  constructor() {
    super();

    this.daysInMonths = [];

    this.state = {
      currentDate: null,
      displayedYear: null,
      displayedMonth: null,
      daysElements: null,
      appointments: null,
      selectedDay: [],
      overlayDisplay: 'none',
      selectedDayNum: null
    }
  }

  getAppointments = () => {
    fetch('http://localhost:3000/appointments')
    .then(resp => {
      resp.json()
      .then(resp => {
        this.setState({
          appointments: resp
        }, (() => {
          this.setDaysInMonth();
        }))
      })
    })
  }

  deleteAppointment = (e) => {
    const parent = e.target.parentElement

    fetch(`http://localhost:3000/appointments/${parent.id}`, {
      method: "delete"
    })
    .then(resp => {
      resp.json()
      .then(resp => {
        this.getAppointments();
        parent.parentElement.removeChild(parent)
        })
      })
  }

  addAppointment = (e) => {
    e.preventDefault();

    const form = e.target.parentElement
    const obj = {
      title: form.querySelector("input[name='title']").value,
      time: form.querySelector("input[name='time']").value,
      desc: form.querySelector("input[name='description']").value,
      year: this.state.displayedYear,
      month: this.state.displayedMonth,
      day: Number(this.state.selectedDayNum)
    };

    form.querySelector("input[name='title']").value = '';
    form.querySelector("input[name='time']").value = '';
    form.querySelector("input[name='description']").value = '';
    this.setState({
      overlayDisplay: "none"
    })

    fetch(`http://localhost:3000/appointments`, {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    .then(resp => {
      resp.json()
      .then(resp => {
        this.getAppointments();
        })
      })
    }


  changeMonth = (type) => {
    type === "+"
      ? this.setState({
        displayedYear: (this.state.displayedMonth % 12) === 0
        ? (this.state.displayedYear + 1)
        : (this.state.displayedYear),
        displayedMonth: (this.state.displayedMonth % 12) + 1
      }, (() => {
        this.setDaysInMonth();
      }))
      : this.setState({
        displayedYear: (this.state.displayedMonth - 1)
        ? (this.state.displayedYear)
        : (this.state.displayedYear - 1),
        displayedMonth: (this.state.displayedMonth - 1)
          ? (this.state.displayedMonth - 1)
          : 12
      }, (() => {
        this.setDaysInMonth();
      }))
    
  }

  testIfAppointed = (day) => {
    let counter = 0;
    this.state.appointments.forEach(el => {
      if(
        el.year === this.state.displayedYear && el.month === this.state.displayedMonth && el.day === day
      ) {
        counter++;
      }
    });
    if(counter > 0) return true
  }

  daysInCurrentMonth = () => {

    this.setState({
      daysInCurrentMonth: this.daysInMonths[this.state.displayedMonth - 1]
    }, (() => {     

      var daysElements = [];

      for (let i = 0; i < this.state.daysInCurrentMonth; i++) {
        const day = ((new Date(`${this.state.displayedYear}-${this.state.displayedMonth}-${i+1}`).getDay() + 6) % 7);

        if(i === 0) {
          for(let j = day; j > 0; j--) {
            daysElements.push(<div key={0 - j} className="calendar__day"></div>)
          }
        }
        
        if(this.state.displayedYear === this.state.currentDate.getFullYear() && this.state.displayedMonth === (this.state.currentDate.getMonth() + 1) && (i + 1) === this.state.currentDate.getDate()){
          if(this.testIfAppointed(i+1)){
            daysElements.push(<div key={i + 1} className="calendar__day calendar__day--currentMonth calendar__day--currentDay calendar__day--appointed" onClick={this.showInfo}>{"- " + (i + 1) + " -"}</div>)
          } else {
            daysElements.push(<div key={i + 1} className="calendar__day calendar__day--currentMonth calendar__day--currentDay" onClick={this.showInfo}>{i + 1}</div>)
          }
        } else {
          if(this.testIfAppointed(i+1)){
            daysElements.push(<div key={i + 1} className="calendar__day calendar__day--currentMonth calendar__day--appointed" onClick={this.showInfo}>{(i + 1)}</div>)
          } else {
            daysElements.push(<div key={i + 1} className="calendar__day calendar__day--currentMonth" onClick={this.showInfo}>{i + 1}</div>)
          }
        }
      }

      this.setState({
        daysElements: daysElements
      })
    }))
  }

  showInfo = (e) => {
    this.setState({
      overlayDisplay: "ok",
      selectedDayNum: e.target.innerText
    }, (() => {
      this.setState({
        selectedDay: this.state.appointments.filter(el => {
          if(el.year === this.state.displayedYear && el.month === this.state.displayedMonth && el.day == this.state.selectedDayNum) return el
        })
      },(() => {
        console.log(this.state.selectedDay);
        
      }))
    }))
  }

  hideInfo = (e) => {
    const infoBox = document.querySelector(".overlay__infoBox");
    if(!infoBox.contains(e.target)){
      this.setState({
        overlayDisplay: "none"
      })
    }
  }

  setDaysInMonth = () => {
    if(this.state.displayedYear % 4 === 0){
      this.daysInMonths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      this.daysInCurrentMonth();      
    } else {
      this.daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      this.daysInCurrentMonth();
    }
  }

  componentDidMount() {
    const date = new Date();    
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    this.setState({
      currentDate: date,
      displayedYear: year,
      displayedMonth: month
    }, () => {
      this.getAppointments();
    })
  }

  render() {
    return (
      <div className="calendar">
        {
          (this.state.currentDate && this.state.displayedYear && this.state.displayedMonth && this.state.appointments)
            && <Fragment>
              <CalendarHeader year={this.state.displayedYear} month={this.state.displayedMonth} changeMonth={this.changeMonth}/>
              <CalendarBody date={this.state.currentDate} year={this.state.displayedYear} month={this.state.displayedMonth} days={this.state.daysElements} apps={this.state.appointments}/>

              {(this.state.overlayDisplay !== "none") && <DayInfo selectedDayInfo={this.state.selectedDay} hide={this.hideInfo} dayMonthYear={
                ((this.state.selectedDayNum < 10) 
                  ? "0" + this.state.selectedDayNum
                  : this.state.selectedDayNum) + '-' +
                ((this.state.displayedMonth < 10) 
                  ? "0" + this.state.displayedMonth
                  : this.state.displayedMonth) + '-' + 
                this.state.displayedYear} 
                delete={this.deleteAppointment} addApp={this.addAppointment}/>
              }

            </Fragment>
        }
      </div>
    )
  }
};
