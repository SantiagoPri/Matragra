import { createContext, useState } from "react";
import {
  getProjects,
  getProject,
  newProject,
  getProjectPhase,
} from "../helpers/api/backend-api";

export const ApiContext = createContext();

const ApiContextProvider = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [jwt, setJwt] = useState("");

  const getAllProjects = async () => {
    const projects = await getProjects(jwt);
    return projects.data;
  };

  const getProjectDetails = async ({ queryKey }) => {
    const { proyectName, index } = queryKey[1];
    const projectInfo = await getProject(jwt, proyectName, index);
    return projectInfo.data;
  };

  const createProject = async (projectInfo) => {
    const response = await newProject(jwt, projectInfo);
    return response.data;
  };

  const updatePhase = async (phaseInfo) => {
    const { projectName, phaseNumber, params } = phaseInfo;
    const updateResponse = await getProjectPhase(
      jwt,
      projectName,
      phaseNumber,
      params
    );
    return updateResponse.data;
  };

  const apiCalls = {
    getAllProjects,
    getProjectDetails,
    createProject,
    updatePhase,
  };
  return (
    <ApiContext.Provider
      value={{ isLogged, setIsLogged, jwt, setJwt, apiCalls }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
