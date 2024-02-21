import React from "react";

import Scrumboard from "./scrumboard";
import SearchBar from "../common/search-bar";
import TabBar from "../tabbar";
import Timeline from "../timeline";

import { fetchProjectTasks } from "../../services/tasks";
import { fetchProject } from "../../services/projects";

/**
 * Shows project in an organization.
 * @param {*} param0 
 * @returns 
 */
const Project = ({ match }) => {
  const { projectId } = match.params;
  const [tasks, setTasks] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedTab, setSelectedTab] = React.useState(0);

  const [currentProject, setCurrentProject] = React.useState(null);

  React.useEffect(() => {
    async function fetchTasks() {
      const response = await fetchProjectTasks(projectId);

      setTasks(response);
    }

    async function fetchProjectById(projectId) {
      const response = await fetchProject(projectId);
      setCurrentProject(response);
    }

    fetchTasks();
    fetchProjectById(projectId);
  }, [projectId]);

  /**
   * Updates the status of the task.
   * 
   * @param {String} id 
   * @param {String} status 
   */
  const updateTask = (id, status) => {
    setTasks(
      tasks.map((task) =>
        task.id.toString() === id ? { ...task, status } : task
      )
    );
  };

  const filterTasks = tasks.filter((task) =>
        task.title.toLowerCase().match(searchValue.toLowerCase()))

  /**
   * Invoked when any value is typed on the search bar.
   * 
   * @param {String} word 
   */
  const searchTasks = (word) => {
    setSearchValue(word);
    filterTasks(word);
  };

  /**
   * Invoked when tab is changed.
   * 
   * @param {*} event 
   * @param {String} newValue 
   */
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  return (
    <div className="project-main__wrapper">
      <TabBar handleChange={handleChange} value={selectedTab}></TabBar>
      <div class="project-container">
        {selectedTab === 0 ?
          <>
            <div className="project__search-wrapper">
              <div className="project__search-container">
                <SearchBar onChange={searchTasks} value={searchValue}></SearchBar>
              </div>
            </div>
        <Scrumboard
          onTaskChanged={updateTask}
          tasks={searchValue.length > 0 ? filteredTasks : tasks}
        ></Scrumboard>
          </> :
        <div>
            {currentProject && 
            <Timeline tasks={tasks}/>
          }
          </div>} 
    </div>
    </div>
  );
};

export default Project;
