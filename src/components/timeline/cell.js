import PropTypes from "prop-types";
import React from "react";

const Cell = ({ index, columnStart, columnEnd, title }) =>  {
    return (
    <div
    key={index}
    className="timeline__task"
    style={{
      gridRow: 2 + index,
      gridColumnStart: columnStart,
      gridColumnEnd: columnEnd + 1,
      zIndex: 2,
    }}
  >
    {title}
  </div>
    )
};

Cell.propTypes = {
    index: PropTypes.number,
    columnStart: PropTypes.number, 
    columnEnd: PropTypes.number,
    title: PropTypes.string
};
  

export default Cell;