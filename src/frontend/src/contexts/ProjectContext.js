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
  const [done, setDone] = useState(false);

  const { mutate: mutatePhase } = useMutation(apiCalls.updatePhase, {
    onSuccess: async (data, variables) => {
      const { projectName, phaseNumber, next } = variables;
      if (next) {
        if (data === "done") {
          await apiCalls.nextPhase(projectName, 3, true);
          await queryClient.refetchQueries(["getProjectInfo"], {
            active: true,
          });
        } else {
          await apiCalls.nextPhase(projectName, phaseNumber, false);
          setIndex(phaseNumber);
          setVisibleIndex(phaseNumber);
        }
      }
      await queryClient.refetchQueries(["getProjectByPhase"], {
        active: true,
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const nextPhase = () => {
    const phaseNumber = index + 1;
    if (phaseNumber > 4 || phaseNumber < 0) {
      return;
    }
    mutatePhase({ projectName: name, phaseNumber, params: {}, next: true });
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
        done,
        setDone,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
