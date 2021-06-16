import { createContext, useState } from "react";
import { getProjects } from "../helpers/api/backend-api";

export const ProjectContext = createContext();

const ProjectContextProvider = (props) => {
  const [name, setName] = useState("");
  const [index, setIndex] = useState(0);
  const [fase0, setFase0] = useState({ objetivos: [], alcance: "" });
  const [fase1, setFase1] = useState({ diseño: {}, check: false });
  const [fase2, setFase2] = useState({});
  const [fase3, setFase3] = useState({ evidencias: [] });

  return (
    <ProjectContext.Provider value={{ name, setName, index, setIndex }}>
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
