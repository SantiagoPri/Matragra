import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
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
  const historyHook = useHistory();

  const getAllProjects = async () => {
    try {
      const projects = await getProjects(jwt);
      return projects.data;
    } catch (error) {
      if (error.response.status === 401) {
        handleUnAuthorizedError();
        return error;
      }
    }
  };

  const getProjectDetails = async ({ queryKey }) => {
    try {
      const { proyectName, index } = queryKey[1];
      const projectInfo = await getProjectByPhase(jwt, proyectName, index);
      return projectInfo.data;
    } catch (error) {
      if (error.response.status === 401) {
        handleUnAuthorizedError();
        return error;
      }
    }
  };

  const getProjectInfo = async ({ queryKey }) => {
    try {
      const { proyectName } = queryKey[1];
      const projectInfo = await getProjectByName(jwt, proyectName);
      return projectInfo.data;
    } catch (error) {
      if (error.response.status === 401) {
        handleUnAuthorizedError();
        return error;
      }
    }
  };

  const createProject = async (projectInfo) => {
    try {
      const response = await newProject(jwt, projectInfo);
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        handleUnAuthorizedError();
        return error;
      }
    }
  };

  const nextPhase = async (phaseInfo) => {
    try {
      const { projectName, phaseNumber, params } = phaseInfo;
      const updateResponse = await putProjectPhase(
        jwt,
        projectName,
        phaseNumber,
        params
      );
      const response2 = await putProject(jwt, projectName, phaseNumber);
      return updateResponse.data;
    } catch (error) {
      if (error.response.status === 401) {
        handleUnAuthorizedError();
        return error;
      }
    }
  };

  const handleUnAuthorizedError = () => {
    localStorage.removeItem("jwt");
    setIsLogged(false);
    setJwt("");
    historyHook.push("/ingresar");
    return;
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
