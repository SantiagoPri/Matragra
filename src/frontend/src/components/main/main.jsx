import SearchBar from "./searchBar";
import { ProjectCard, NewProjectCard } from "./proyectsCard";
import {
  ProyectContainer,
  ProyectWrapper,
  ProyectsH1,
  Details,
  Summary,
  HR,
} from "./styled";

const Main = () => {
  return (
    <ProyectContainer id="services">
      <ProyectsH1>PROYECTOS</ProyectsH1>
      <SearchBar />
      <Collapse Title="Mis proyectos">
        <ProyectWrapper>
          <NewProjectCard/>
          <ProjectCard Title="proyecto1"/>
        </ProyectWrapper>
      </Collapse>
      <Collapse Title="Todos Los Proyectos">
        <ProyectWrapper>
          <NewProjectCard/>
          <ProjectCard Title="proyecto3"/>
          <ProjectCard Title="proyecto2"/>
        </ProyectWrapper>
      </Collapse>
    </ProyectContainer>
  );
};

export default Main;

const Collapse = (props) => {
  const { Title, children } = props;
  return (
    <Details open={true}>
      <Summary onselectstart="return false">
        {Title}
        <HR />
      </Summary>
      {children}
    </Details>
  );
};
