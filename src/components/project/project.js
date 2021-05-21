import React from "react";

import Scrumboard from "./scrumboard";
import SearchBar from "../common/search-bar";

import { fetchProjectTasks } from "../services/tasks";

const Project = ({ match }) => {
  const { projectId } = match.params;

  const [tasks, setTasks] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [filteredTasks, setFilteredTasks] = React.useState([]);

  React.useEffect(() => {
    async function fetchTasks() {
      const response = await fetchProjectTasks(projectId);

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

  const filterTasks = (value) => {
    setFilteredTasks(
      tasks.filter((task) =>
        task.title.toLowerCase().match(value.toLowerCase())
      )
    );
  };

  const searchTasks = (word) => {
    setSearchValue(word);
    filterTasks(word);
  };

  console.log("tasks", tasks);

  return (
    <div className="project-main__wrapper">
      <h1 className="scrumboard__title">SCRUMBOARD</h1>
      <div className="project__search-wrapper">
        <div className="project__search-container">
          <SearchBar onChange={searchTasks} value={searchValue}></SearchBar>
        </div>
      </div>
      <Scrumboard
        onTaskChanged={updateTask}
        tasks={searchValue.length > 0 ? filteredTasks : tasks}
      ></Scrumboard>
    </div>
  );
};

export default Project;
