import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  getProjects,
  getProjectByName,
  getProjectByPhase,
  newProject,
  putProject,
  putProjectPhase,
  saveFileInS3Bucket,
  getProjectMembers,
  foroList,
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
      } else {
        throw console.error();
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
      } else {
        throw console.error();
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
      } else {
        throw console.error();
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
      } else {
        throw console.error();
      }
    }
  };

  const updatePhase = async (phaseInfo) => {
    try {
      const { projectName, phaseNumber, params } = phaseInfo;
      const updateResponse = await putProjectPhase(
        jwt,
        projectName,
        phaseNumber,
        params
      );
      return updateResponse.data;
    } catch (error) {
      if (error.response.status === 401) {
        handleUnAuthorizedError();
        return error;
      } else {
        throw console.error();
      }
    }
  };

  const nextPhase = async (projectName, phaseNumber) => {
    try {
      await putProject(jwt, projectName, phaseNumber);
    } catch (error) {
      if (error.response.status === 401) {
        handleUnAuthorizedError();
      } else {
        throw console.error();
      }
    }
  };

  const saveFile = async (file, projectName, type) => {
    try {
      const fileType = type ? type : file.type;
      const base64data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => reject(error);
      });
      const url = await saveFileInS3Bucket(
        jwt,
        base64data,
        fileType,
        file.name,
        projectName
      );
      return url.data.url;
    } catch (error) {
      if (error.response.status === 401) {
        handleUnAuthorizedError();
      } else {
        throw console.error();
      }
    }
  };

  const getMembersByProject = async ({ queryKey }) => {
    try {
      const { projectName } = queryKey[1];
      let projectMembers = await getProjectMembers(jwt, projectName);
      projectMembers = projectMembers.data;
      if (projectMembers.status !== "ok") {
        throw new Error("hubo un error");
      }
      return projectMembers.users.map((user) => user.sk);
    } catch (error) {
      if (error.response.status === 401) {
        handleUnAuthorizedError();
      } else {
        throw console.error();
      }
    }
  };

  const getForoList = async ({ queryKey }) => {
    try {
      const { projectName } = queryKey[1];
      let list = await foroList(jwt, projectName);
      list = list.data;
      if (list.status !== "ok") {
        throw new Error("hubo un error");
      }
      const { pk, sk, ...phasesList } = list;
      return Object.entries(phasesList).map((phase) => {
        const [title, items] = phase;
        return { title, items };
      });
    } catch (error) {
      if (error.response.status === 401) {
        handleUnAuthorizedError();
      } else {
        throw console.error();
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
    updatePhase,
    nextPhase,
    saveFile,
    getMembersByProject,
    getForoList,
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
