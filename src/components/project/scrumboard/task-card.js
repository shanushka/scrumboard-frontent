import React from "react";

const STATUS = [
  { label: "To-do", value: "Todo" },
  { label: "In-Progress", value: "In-Progress" },
  { label: "Code-review", value: "Code-review" },
  { label: "QA", value: "QA" },
  { label: "Done", value: "Done" },
];

const TaskCard = (props) => {
  const { task, handleDragStart, handleDragEnd } = props;

  return (
    <div
      id={task.id}
      key={task.id}
      draggable="true"
      onDragEnd={handleDragEnd}
      className="task-card__wrapper"
      onDragStart={handleDragStart}
    >
      <div className="task-card__title">{task.title}</div>
    </div>
  );
};

export default TaskCard;
