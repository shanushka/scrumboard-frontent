import React from "react";

import Scrumboard from "./scrumboard";

import { fetchProjectTasks } from "../services/tasks";

const Project = ({ match }) => {
  const { projectId } = match.params;

  const [tasks, setTasks] = React.useState([]);

  console.log("projectId", projectId);

  React.useEffect(() => {
    async function fetchTasks() {
      const response = await fetchProjectTasks(projectId);
      console.log("repos", response);

      setTasks(response);
    }

    fetchTasks();
  }, [projectId]);

  const updateTask = (id, status) => {
    setTasks(
      tasks.map((task) =>
        task.id.toString() === id ? { ...task, status } : task
      )
    );
  };

  console.log("tasks", tasks);

  return (
    <div>
      <Scrumboard onTaskChanged={updateTask} tasks={tasks}></Scrumboard>
    </div>
  );
};

export default Project;
