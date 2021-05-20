import React from "react";

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
    console.log("dragStart");
    event.dataTransfer.setData("Text", event.target.id);
  }

  function dragEnd(event) {
    console.log("dragEnd");

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
    console.log("handleDragLeave", event.target);
    event.target.classList.remove("over");
  };

  return (
    <div className="scrumboard__wrapper">
      <h2 className="scrumboard__title">SCRUMBOARD</h2>
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
            {status.label}
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

export default Scrumboard;
