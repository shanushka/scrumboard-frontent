import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SearchBar from "../common/search-bar";
import { fetchProjects } from "../../services/projects";

const Home = () => {
  const [projects, setProjects] = useState([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    async function fetchAllProjects () {
      const response = await fetchProjects();
      setProjects(response)
    }

    fetchAllProjects()
  })

  const filteredProjects = searchValue
  ? projects.filter((project) =>
      project.title.toLowerCase().includes(searchValue.toLowerCase())
    )
  : projects;

  const handleSearchInputChange = (newValue) => {
    setSearchValue(newValue);
  }

  return (
    <div className="main__wrapper">
      <div className="main__container">
        <h1 className="main__title">AgileFlow</h1>
        <div className="main__body">
          <p className="main__paragraph">Track project progress in real time for projects and communicate with your team.</p>
          <div className="main__search-bar">
            <SearchBar onChange={handleSearchInputChange} value={searchValue}/>
          </div>
        </div>
        <div className="project__body-container">
          <h2 className="project__body-title">Projects</h2>
          <div className="project__body-wrapper">
              {filteredProjects.map((project) => (
                <Link to={`/projects/${project.id}`}>
                  <div className="project-card__wrapper" key={project.id}>
                    {project.title}
                    <div className="project-card__type">
                      Type: <strong>{project.type}</strong>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
