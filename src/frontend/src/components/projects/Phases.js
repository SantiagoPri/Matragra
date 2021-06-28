import { Fragment, useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { Task } from "./tareas/Task";
import Waiting from "../waiting/waiting";
import { Titulo, Lista, Text } from "./styled";

const Phases = () => {
  const { visibleIndex, visiblePhase } = useContext(ProjectContext);
  return visibleIndex === 0 ? <Phase0 /> : <Task />;
};

export default Phases;

const Phase0 = () => {
  const { visiblePhase } = useContext(ProjectContext);
  //console.log(visiblePhase);
  return visiblePhase.objectives && visiblePhase.scope ? (
    <Fragment>
      <Titulo>Objetivos</Titulo>
      <Lista>
        {visiblePhase.objectives.map((objetivo, index) => {
          return <li key={index}>{objetivo}</li>;
        })}
      </Lista>
      <Titulo>Alcance</Titulo>
      <Text>{visiblePhase.scope}</Text>
    </Fragment>
  ) : (
    <Waiting />
  );
};
