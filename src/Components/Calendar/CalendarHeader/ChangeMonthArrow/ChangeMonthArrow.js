import React, { Component, Fragment } from "react";

import "./ChangeMonthArrow.scss";

export const ChangeMonthArrow = (props) => {

  const handleClick = () => {
    props.type === "+"
     ? props.changeMonth("+")
     : props.changeMonth("-")
    
  }

  return (
    <Fragment>
      {
        props.type === "+"
          ? <button onClick={handleClick}>&gt;</button>
          : <button onClick={handleClick}>&lt;</button>
      }
    </Fragment>
  );
};
