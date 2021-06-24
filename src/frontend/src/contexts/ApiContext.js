import { createContext, useState } from "react";
import {
  getProjects,
  getProjectByName,
  getProjectByPhase,
  newProject,
  putProject,
  putProjectPhase,
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
    const projectInfo = await getProjectByPhase(jwt, proyectName, index);
    return projectInfo.data;
  };

  const getProjectInfo = async ({ queryKey }) => {
    const { proyectName } = queryKey[1];
    const projectInfo = await getProjectByName(jwt, proyectName);
    return projectInfo.data;
  };

  const createProject = async (projectInfo) => {
    const response = await newProject(jwt, projectInfo);
    return response.data;
  };

  const nextPhase = async (phaseInfo) => {
    const { projectName, phaseNumber, params } = phaseInfo;
    const updateResponse = await putProjectPhase(
      jwt,
      projectName,
      phaseNumber,
      params
    );
    await putProject(jwt, projectName, phaseNumber);
    return updateResponse.data;
  };

  const apiCalls = {
    getAllProjects,
    getProjectInfo,
    getProjectDetails,
    createProject,
    nextPhase,
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
