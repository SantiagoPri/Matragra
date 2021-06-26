import { ProyectsCard, ProyectsH2, ProyectsIcon } from "./styled";
import { useHistory } from "react-router-dom";
import { useContext, Fragment } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { GeneralContext } from "../../contexts/GeneralContext";
import { NewProject } from "../newProject/NewProject";
import { Modal } from "../newProject/Modal";

export const ProjectCard = (props) => {
  const { setName, setIndex, setVisibleIndex, nextPhase } =
    useContext(ProjectContext);
  const { projectInfo, owned } = props;
  const historyHook = useHistory();

  const onClick = () => {
    if (owned) {
      setName(projectInfo.pk);
      setIndex(projectInfo.index);
      setVisibleIndex(projectInfo.index);
      if (projectInfo.index === 0) {
        nextPhase();
      }
      historyHook.push(`/project/${projectInfo.pk}`);
    }
  };
  return (
    <ProyectsCard onClick={onClick}>
      <ProyectsH2>{projectInfo.pk}</ProyectsH2>
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
