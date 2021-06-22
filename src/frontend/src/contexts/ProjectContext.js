import { createContext, useState, useContext } from "react";
import { ApiContext } from "./ApiContext";
import { useMutation } from "react-query";

export const ProjectContext = createContext();

const ProjectContextProvider = (props) => {
  const { apiCalls } = useContext(ApiContext);
  const [name, setName] = useState("");
  const [index, setIndex] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [fase0, setFase0] = useState({ objetivos: [], alcance: "" });
  const [fase1, setFase1] = useState({ diseño: {}, check: false });
  const [fase2, setFase2] = useState({});
  const [fase3, setFase3] = useState({ evidencias: [] });

  const { mutate: mutatePhase, isLoading } = useMutation(apiCalls.updatePhase, {
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

  const nextPhase = () => {
    const newPhase = index + 1;
    if (newPhase > 3 || newPhase < 0) {
      return;
    }
    let newArgs;
    switch (newPhase) {
      case 1:
        newArgs = { initialData: "" };
        break;
      case 2:
        newArgs = { initialData: "" };
        break;
      case 3:
        newArgs = { initialData: "" };
        break;
    }
    mutatePhase({ projectName: name, phaseNumber: newPhase, params: newArgs });
  };

  return (
    <ProjectContext.Provider
      value={{ name, setName, index, setIndex, nextPhase }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
