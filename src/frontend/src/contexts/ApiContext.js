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
  postCreateForum,
  getTopic,
  putForo,
  postLinkUser,
  postUnLinkUser,
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
      return { url: url.data.url, name: file.name };
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
      if (!list.status || list.status !== "ok") {
        console.error("error of list of topics: ", JSON.stringify(list));
        throw new Error("hubo un error");
      }
      const { pk, sk, ...phasesList } = list.foroList ? list.foroList : {};
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

  const createForum = async (forum) => {
    try {
      if (!forum.description || forum.description === "Escriba su entrada") {
        return "nothing to do here";
      }
      const updateResponse = await postCreateForum(jwt, forum);
      if (updateResponse.data.status !== "ok") {
        throw new Error("hubo un error");
      }
      return updateResponse.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        handleUnAuthorizedError();
        return error;
      } else {
        throw console.error();
      }
    }
  };

  const mainTopic = async ({ queryKey }) => {
    try {
      const { projectName, currentForoName } = queryKey[1];
      if (!(projectName && currentForoName)) {
        return null;
      }
      let topic = await getTopic(jwt, projectName, currentForoName);
      topic = topic.data;
      if (!topic.status || topic.status !== "ok") {
        console.error("error of topic : ", JSON.stringify(topic));
        throw new Error("hubo un error");
      }
      const { pk, sk, ...phasesList } = topic.foro;
      return { foroName: sk, ...phasesList };
    } catch (error) {
      if (error.response.status === 401) {
        handleUnAuthorizedError();
      } else {
        throw console.error();
      }
    }
  };

  const newAnswer = async (answerInfo) => {
    try {
      const {
        name: projectName,
        currentForoName: foroName,
        answer,
      } = answerInfo;
      const updateResponse = await putForo(jwt, projectName, foroName, answer);
      if (updateResponse.data.status !== "ok") {
        throw new Error("hubo un error");
      }
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

  const linkUser = async ({ email, projectName }) => {
    try {
      if (!email) {
        return;
      }
      const updateResponse = await postLinkUser(jwt, email, projectName);
      if (updateResponse.data.status !== "ok") {
        throw new Error("hubo un error");
      }
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

  const unLinkUser = async ({ item: userName, projectName }) => {
    try {
      const updateResponse = await postUnLinkUser(jwt, userName, projectName);
      if (updateResponse.data.status !== "ok") {
        throw new Error("hubo un error");
      }
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
    createForum,
    mainTopic,
    newAnswer,
    linkUser,
    unLinkUser,
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
