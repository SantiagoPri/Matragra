import SearchBar from "./searchBar";
import { ProjectCard, NewProjectCard } from "./proyectsCard";
import { ApiContext } from "./../../contexts/ApiContext";
import { useContext, Fragment } from "react";
import { useQuery } from "react-query";
import {
  ProyectContainer,
  ProyectWrapper,
  ProyectsH1,
  Details,
  Summary,
  HR,
  Space,
} from "./styled";

const Main = () => {
  const { apiCalls } = useContext(ApiContext);
  const { data: projects, isLoading } = useQuery(
    "getAllProjects",
    apiCalls.getAllProjects
  );

  return (
    <ProyectContainer id="services" className="container-fluid">
      <ProyectsH1>PROYECTOS</ProyectsH1>
      <SearchBar />
      <Collapse Title="Mis proyectos">
        <ProyectWrapper>
          <NewProjectCard />
          {isLoading ? (
            <Fragment />
          ) : (
            projects.userProjectNames.map((project) => (
              <ProjectCard key={project.pk} Title={project.pk} owned={true}/>
            ))
          )}
        </ProyectWrapper>
      </Collapse>
      <Collapse Title="Todos Los Proyectos">
        <ProyectWrapper>
          {isLoading ? (
            <Fragment />
          ) : (
            projects.OtherProjects.map((project) => (
              <ProjectCard key={project.pk} Title={project.pk} owned={false} />
            ))
          )}
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
