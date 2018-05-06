import React, { Component, Fragment } from "react";

import "./DayInfo.scss";

export class DayInfo extends Component {
  constructor(props) {
    super(props);

  }

  
  render() {
    return (
      <section className="overlay" onClick={this.props.hide}>
        <div className="overlay__infoBox">
          {
            (this.props.selectedDayInfo.length > 0) && <h1>Appointments for {this.props.dayMonthYear}</h1>
          }
          {(this.props.selectedDayInfo.length > 0)
            ? (
              this.props.selectedDayInfo.map((el, i) => {
                return(
                  <div key={i} id={el.id}>
                    <h3>{el.title}</h3>
                    <p>{el.time}</p>
                    <p>{el.desc}</p>
                    <button>Modify</button>
                    <button onClick={this.props.delete}>Delete</button>
                  </div>
                )
              })
            )
            : <h2>No appointments <p>for {this.props.dayMonthYear}</p></h2>
          }
          <form>
            <h3>New appointment</h3>
            <p><span>Title: </span><input name="title" /></p>
            <p><span>Time: </span><input name="time" /></p>
            <p><span>Description: </span><input name="description" /></p>
            <button className="overlay__addApp" onClick={this.props.addApp}>Add</button>
          </form>
          
        </div>)
      </section>
    )
  }
};
