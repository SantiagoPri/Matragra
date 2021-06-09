import { createContext, useState } from "react";
import { getProjects, getProject } from "../helpers/api/backend-api";

export const ApiContext = createContext();

const ApiContextProvider = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [jwt, setJwt] = useState("");

  const getAllProjects = async () => {
    const projects = await getProjects(jwt);
    return projects.data;
  };

  const getProjectDetails = async ({ queryKey }) => {
    const projectName = queryKey[1];
    const projects = await getProject(jwt, projectName);
    return projects.data;
  };

  const apiCalls = { getAllProjects, getProjectDetails };
  return (
    <ApiContext.Provider
      value={{ isLogged, setIsLogged, jwt, setJwt, apiCalls }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContextProvider;
