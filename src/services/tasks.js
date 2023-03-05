import { TASKS } from "../mock_api/tasks";

/**
 * @returns Default Collaborator expiry.
 */
export const fetchProjectTasks = (projectId) => {
  return Promise.resolve(
    TASKS.filter((task) => task.projectId.toString() === projectId.toString())
  );
};
