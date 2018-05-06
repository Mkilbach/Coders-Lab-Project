import React, { Component, Fragment } from "react";

import { ChangeMonthArrow } from "./ChangeMonthArrow/ChangeMonthArrow";

import "./CalendarHeader.scss";

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const CalendarHeader = (props) => {
  return (
    <Fragment>
      <div className="calendar__header">
        <ChangeMonthArrow type={"-"} changeMonth={props.changeMonth} />
          <section>
            <p>{props.year}</p>
            <h1>{MONTHS[props.month - 1]}</h1>
          </section>
        <ChangeMonthArrow type={"+"} changeMonth={props.changeMonth} />
      </div>
    </Fragment>
  );
};
