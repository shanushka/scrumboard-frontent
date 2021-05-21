import React from "react";
import PropTypes from "prop-types";

import TaskCard from "./task-card";

const STATUS = [
  { label: "To-do", value: "Todo" },
  { label: "In-Progress", value: "In-Progress" },
  { label: "Code-review", value: "Code-review" },
  { label: "QA", value: "QA" },
  { label: "Done", value: "Done" },
];

const Scrumboard = (props) => {
  const { tasks, onTaskChanged } = props;

  function dragStart(event) {
    event.target.style.opacity = 0.2;
    event.dataTransfer.setData("Text", event.target.id);
  }

  function dragEnd(event) {
    event.target.style.opacity = 1;
    document.getElementById("demo").innerHTML =
      "Finished dragging the p element.";
  }

  function allowDrop(event) {
    event.preventDefault();
  }

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

  const handleDragEnter = (event) => {
    if (
      event.target.className === "task-card__title" ||
      event.target.className === "task-card__wrapper"
    ) {
      return;
    }

    event.target.classList.add("over");
  };

  const handleDragLeave = (event) => {
    event.target.classList.remove("over");
  };

  return (
    <div className="scrumboard__wrapper">
      <div className="scrumboard__container">
        {STATUS.map((status) => (
          <div
            name={status.value}
            className="scrumboard__box-container"
            onDragOver={allowDrop}
            onDrop={handleDrop}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <div className="scrumboard__title">{status.label}</div>
            {tasks.map((task) =>
              status.value === task.status ? (
                <TaskCard
                  handleDragEnd={dragEnd}
                  handleDragStart={dragStart}
                  task={task}
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
