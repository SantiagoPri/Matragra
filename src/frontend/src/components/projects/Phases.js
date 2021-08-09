import { Fragment, useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { Task } from "./tareas/Task";
import Waiting from "../waiting/waiting";
import { Titulo, Lista, Text } from "./styled";

const Phases = () => {
  const { visibleIndex } = useContext(ProjectContext);
  return visibleIndex === 0 ? <Phase0 /> : <Task />;
};

export default Phases;

const Phase0 = () => {
  const { visiblePhase } = useContext(ProjectContext);
  return visiblePhase.objectives && visiblePhase.scope ? (
    <Fragment>
      <div className="card" style={{ backgroundColor: "#282c34" }}>
        <div className="card-body">
          <Titulo>Objetivos</Titulo>
          <Lista>
            {visiblePhase.objectives.map((objetivo, index) => {
              return <li key={index}>{objetivo}</li>;
            })}
          </Lista>
          <Titulo>Alcance</Titulo>
          <Text>{visiblePhase.scope}</Text>
        </div>
      </div>
    </Fragment>
  ) : (
    <Waiting />
  );
};
