import React from "react";

import Scrumboard from "./scrumboard";
import SearchBar from "../common/search-bar";
import TabBar from "../Tab-bar";
import Timeline from "../Timeline";

import { fetchProjectTasks } from "../../services/tasks";
import { fetchProject } from "../../services/projects";

const Project = ({ match }) => {
  const { projectId } = match.params;

  console.log("!!!!!!!!!!!!!!project", projectId)

  const [tasks, setTasks] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [filteredTasks, setFilteredTasks] = React.useState([]);
  // New state for storing the current project data
  const [currentProject, setCurrentProject] = React.useState(null);

  React.useEffect(() => {
    async function fetchTasks() {
      const response = await fetchProjectTasks(projectId);

      setTasks(response);
    }

    async function fetchProjectById(projectId) {
      console.log("projectId", projectId);
      const response = await fetchProject(projectId);
      setCurrentProject(response);
    }

    fetchTasks();
    fetchProjectById(projectId);
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

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue)

  }

  const [selectedTab, setSelectedTab] = React.useState(0);


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
