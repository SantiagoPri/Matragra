import { ProyectsCard, ProyectsH2, ProyectsIcon } from "./styled";

export const ProjectCard = (props) => {
  const { Title } = props;
  return (
    <ProyectsCard>
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
