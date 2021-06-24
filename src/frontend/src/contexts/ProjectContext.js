import { createContext, useState, useContext } from "react";
import { ApiContext } from "./ApiContext";
import { useMutation } from "react-query";

export const ProjectContext = createContext();

const ProjectContextProvider = (props) => {
  const { apiCalls } = useContext(ApiContext);
  const [name, setName] = useState("");
  const [index, setIndex] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [visiblePhase, setVisiblePhase] = useState({});

  const { mutate: mutatePhase, isLoading } = useMutation(apiCalls.nextPhase, {
    onSuccess: async (data, variables) => {
      if (data.status === "error") {
        //setErrors({ userName: data.message });TODO: que es lo que recibe
      }
      if (data.status === "ok") {
        const { phaseNumber } = variables;
        setIndex(phaseNumber);
        setVisibleIndex(phaseNumber);
      }
    },
  });

  const nextPhase = (projectName, phase) => {
    const phaseNumber = phase + 1;
    if (phaseNumber > 3 || phaseNumber < 0) {
      return;
    }
    mutatePhase({ projectName, phaseNumber, params: {} });
  };

  return (
    <ProjectContext.Provider
      value={{
        name,
        setName,
        index,
        setIndex,
        visibleIndex,
        setVisibleIndex,
        nextPhase,
        visiblePhase,
        setVisiblePhase,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
