import { PROJECTS } from "../mock_api/projects";

/**
 * @returns Default Collaborator expiry.
 */
export const fetchProject= (projectId) => {
  return Promise.resolve(
    PROJECTS.filter((project) => project.id.toString() === projectId.toString())
  );
};


export const fetchProjects =() => {
    return Promise.resolve(
        PROJECTS
    )
}