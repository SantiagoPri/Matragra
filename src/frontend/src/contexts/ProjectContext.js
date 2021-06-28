import { createContext, useState, useContext } from "react";
import { ApiContext } from "./ApiContext";
import { useMutation } from "react-query";
import { queryClient } from "../App";

export const ProjectContext = createContext();

const ProjectContextProvider = (props) => {
  const { apiCalls } = useContext(ApiContext);
  const [name, setName] = useState("");
  const [index, setIndex] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [visiblePhase, setVisiblePhase] = useState({});

  const { mutate: mutatePhase } = useMutation(apiCalls.nextPhase, {
    onSuccess: async (data, variables) => {
      if (data.status === "error") {
        //setErrors({ userName: data.message });TODO: que es lo que recibe
      }
      if (data.status === "ok") {
        const { phaseNumber } = variables;
        setIndex(phaseNumber);
        setVisibleIndex(phaseNumber);
        await queryClient.refetchQueries(["getProjectByPhase"], {
          active: true,
        });
      }
    },
  });

  const nextPhase = () => {
    const phaseNumber = index + 1;
    if (phaseNumber > 3 || phaseNumber < 0) {
      return;
    }
    mutatePhase({ projectName: name, phaseNumber, params: {} });
  };

  const updatePhase = (taskKey, taskToUpdate) => {
    const phase = { ...visiblePhase };
    phase[taskKey] = taskToUpdate;
    mutatePhase({
      projectName: name,
      phaseNumber: visibleIndex,
      params: phase,
    });
  };

  const deletePhase = (taskKey) => {
    const { [taskKey]: taskToDelete, ...phase } = visiblePhase;
    mutatePhase({
      projectName: name,
      phaseNumber: visibleIndex,
      params: phase,
    });
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
        visiblePhase,
        setVisiblePhase,
        nextPhase,
        updatePhase,
        deletePhase,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
