import { ProyectsCard, ProyectsH2, ProyectsIcon } from "./styled";
import { useHistory } from "react-router-dom";

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
  return (
    <ProyectsCard>
      <ProyectsIcon src={"./img/6nuevoproyecto_192x192.png"} />
      <ProyectsH2>Nuevo Proyecto</ProyectsH2>
    </ProyectsCard>
  );
};
