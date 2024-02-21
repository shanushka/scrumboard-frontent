import React from "react";
import PropTypes from "prop-types";

import TaskCard from "./task-card";
import CONSTANTS from "../../../constants/constants";

/**
 * 
 * @param {object} props 
 * @returns 
 */
const Scrumboard = (props) => {
  const { tasks, onTaskChanged } = props;

  /**
   * Starts the dragging of targetted id.
   * @param {*} event 
   */
  function dragStart(event) {
    event.target.style.opacity = 0.2;
    event.dataTransfer.setData("Text", event.target.id);
  }

   /**
   * Ends the dragging of targetted id.
   * @param {*} event 
   */
  function dragEnd(event) {
    event.target.style.opacity = 1;
    document.getElementById("demo").innerHTML =
      "Finished dragging the p element.";
  }

  function allowDrop(event) {
    event.preventDefault();
  }

  /**
   * Handles after a targetted event is dropped on destination.
   * @param {*} event 
   */
  const handleDrop = (event) => {
    event.preventDefault();

    if (
      event.target.className === "task-card__title" ||
      event.target.className === "task-card__wrapper"
    ) {
      return;
    }
    event.target.classList.remove("over");

    const id = event.dataTransfer.getData("Text");
    const status = event.target.getAttribute("name");

    onTaskChanged(id, status);
  };

  /**
   * Handles when another element enters the targeted element.
   * @param {*} event 
   * @returns 
   */
  const handleDragEnter = (event) => {
    if (
      event.target.className === "task-card__title" ||
      event.target.className === "task-card__wrapper"
    ) {
      return;
    }

    event.target.classList.add("over");
  };


  /**
   * Handles when another element leaves the targeted element.
   * @param {*} event 
   * @returns 
   */
  const handleDragLeave = (event) => {
    event.target.classList.remove("over");
  };

  return (
    <div className="scrumboard__wrapper">
      <div className="scrumboard__container">
        {CONSTANTS.STATUS.map((status) => (
          <div
            name={status.value}
            className="scrumboard__box-container"
            onDragOver={allowDrop}
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <div className="scrumboard__title">{status.label}</div>
            {tasks.map((task, index) =>
              status.value === task.status ? (
                <TaskCard
                  handleDragEnd={dragEnd}
                  handleDragStart={dragStart}
                  task={task}
                  key={index}
                />
              ) : null
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

Scrumboard.propTypes = {
  tasks: PropTypes.string,
  onTaskChanged: PropTypes.func,
};

export default Scrumboard;
