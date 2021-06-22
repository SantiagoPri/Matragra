import SearchBar from "./searchBar";
import { ProjectCard, NewProjectCard } from "./proyectsCard";
import { ApiContext } from "./../../contexts/ApiContext";
import { GeneralContext } from "../../contexts/GeneralContext";
import Waiting from "../waiting/waiting";
import { useContext, Fragment, useEffect } from "react";
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
  const {
    data: projects,
    isLoading,
    refetch,
  } = useQuery("getAllProjects", apiCalls.getAllProjects, {
    onError: (error) => {
      Location.reload(false);
      return;
    },
  });

  const { newProjectIsOpen } = useContext(GeneralContext);
  useEffect(() => {
    refetch();
  }, [newProjectIsOpen]);

  return (
    <ProyectContainer id="services" className="container-fluid">
      {isLoading ? (
        <Waiting />
      ) : (
        <Fragment>
          <ProyectsH1>PROYECTOS</ProyectsH1>
          <SearchBar />
          <Collapse Title="Mis proyectos">
            <ProyectWrapper>
              <NewProjectCard />
              {projects.userProjectNames.map((project) => (
                <ProjectCard
                  key={project.pk}
                  projectInfo={project}
                  owned={true}
                />
              ))}
            </ProyectWrapper>
          </Collapse>
          <Collapse Title="Todos Los Proyectos">
            <ProyectWrapper>
              {projects.OtherProjects.map((project) => (
                <ProjectCard
                  key={project.pk}
                  projectInfo={project}
                  owned={false}
                />
              ))}
            </ProyectWrapper>
          </Collapse>
        </Fragment>
      )}
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
