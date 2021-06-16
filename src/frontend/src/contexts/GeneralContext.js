import { createContext, useState, useContext } from "react";
import { ApiContext } from "./ApiContext";
import { useMutation } from "react-query";

export const GeneralContext = createContext();

const GeneralContextProvider = (props) => {
  const [newProjectIsOpen, setNewProjectIsOpen] = useState(false);
  const [listObjectives, setListObjectives] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [alcance, setAlcance] = useState("");

  const openNewProjectModal = () => {
    setListObjectives([]);
    setProjectName("");
    setAlcance("");
    setNewProjectIsOpen(true);
  };

  const { apiCalls } = useContext(ApiContext);
  const { mutate, isLoading } = useMutation(apiCalls.createProject, {
    onSuccess: async (data) => {
      if (data.status === "error") {
        //setErrors({ userName: data.message });TODO: que es lo que recibe
      }
      if (data.status === "ok") {
        setNewProjectIsOpen(false);
      }
    },
  });

  const createProject = () => {
    const newProject = formatNewProject(listObjectives, projectName, alcance);
    mutate(newProject);
  };

  return (
    <GeneralContext.Provider
      value={{
        newProjectIsOpen,
        setNewProjectIsOpen,
        openNewProjectModal,
        listObjectives,
        setListObjectives,
        projectName,
        setProjectName,
        alcance,
        setAlcance,
        createProject,
      }}
    >
      {props.children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;

function formatNewProject(listObjectives, projectName, alcance) {
  return {
    projectName: projectName,
    index: 0,
    fase0: {
      objetivos: listObjectives.map((objective) => objective.name),
      alcance: alcance,
    },
  };
}
