import { ProyectsCard, ProyectsH2, ProyectsIcon } from "./styled";
import { useHistory } from "react-router-dom";
import { useContext, useState, Fragment } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";
import { NewProject } from "../newProject/NewProject";
import { Modal } from "../newProject/Modal";

export const ProjectCard = (props) => {
  const { Title, owned } = props;
  const historyHook = useHistory();

  const onClick = () => {
    if (owned) {
      historyHook.push(`/project/${Title}`);
    }
  };
  return (
    <ProyectsCard onClick={onClick}>
      <ProyectsH2>{Title}</ProyectsH2>
    </ProyectsCard>
  );
};

export const NewProjectCard = () => {
  const { newProjectIsOpen, openNewProjectModal } = useContext(GeneralContext);
  return (
    <Fragment>
      <ProyectsCard onClick={openNewProjectModal}>
        <ProyectsIcon src={"./img/6nuevoproyecto_192x192.png"} />
        <ProyectsH2>Nuevo Proyecto</ProyectsH2>
      </ProyectsCard>
      {newProjectIsOpen ? (
        <NewProject title="Nuevo Proyecto">
          <Modal />
        </NewProject>
      ) : null}
    </Fragment>
  );
};
