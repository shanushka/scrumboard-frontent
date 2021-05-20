import React from "react";
import { Link } from "react-router-dom";

import Scrumboard from "../project/scrumboard";

import { Projects } from "../../mock_api/projects";

const Home = () => {
  return (
    <div className="main__wrapper">
      <div className="main__container">
        <h1 className="main__title">Projects</h1>
        <div className="project__body-wrapper">
          {Projects.map((project) => (
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
  );
};

export default Home;
