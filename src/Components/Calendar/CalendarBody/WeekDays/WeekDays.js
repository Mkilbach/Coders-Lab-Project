import React, { Component, Fragment } from "react";

import "./WeekDays.scss";

export const WeekDays = () => {

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <Fragment>
      <div className="calendar__weekdays">
        {weekDays.map((el, i) => {
          return <div className="calendar__weekday" key={i}>{el}</div>;
        })}
      </div>
    </Fragment>
  );
};
