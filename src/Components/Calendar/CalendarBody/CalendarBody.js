import React, { Component, Fragment } from "react";

import { WeekDays } from "./WeekDays/WeekDays";
import { MonthDays } from "./MonthDays/MonthDays";

import "./CalendarBody.scss";

export const CalendarBody = (props) => {

  return (
    <Fragment>
      <WeekDays />
      <MonthDays date={props.date} year={props.year} month={props.month} days={props.days} apps={props.apps}/>
    </Fragment>
  );
};
