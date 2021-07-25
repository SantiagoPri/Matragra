import { ApiContext } from "../contexts/ApiContext";
import { ProjectContext } from "../contexts/ProjectContext";
import { Fragment, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import Waiting from "./waiting/waiting";
import {
  useParams,
  Switch,
  Route,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import Project from "./projects/Project";
import { CreateForum } from "./foro/CreateForum";

const ProjectRouter = () => {
  const { apiCalls } = useContext(ApiContext);
  const { setName, name, visibleIndex, setIndex, setVisiblePhase } =
    useContext(ProjectContext);
  const { proyectName } = useParams();
  const { url, path } = useRouteMatch();
  const historyHook = useHistory();
  const [isTheProject, setIsTheProject] = useState(false);
  useEffect(() => {
    console.log("url", url);
    console.log("path", path);
    console.log("project name", proyectName);
    console.log("name", name);
    setName(proyectName);
    setIsTheProject(true);

    // if (proyectName === name) {
    // } else {
    //   console.log("here");
    //   historyHook.push("/main");
    // }
  }, []);

  useQuery(
    ["getProjectByPhase", { proyectName, index: visibleIndex }],
    apiCalls.getProjectDetails,
    {
      enabled: isTheProject,
      onSuccess: (data) => {
        //console.log("phase Details", data);
        if (!data.projectDetail) {
          historyHook.push("/main");
          return;
        }
        const { pk, sk, ...phase } = data.projectDetail;
        setVisiblePhase(phase);
      },
      onError: (error) => {
        historyHook.push("/main");
      },
    }
  );
  const { data: projectInfo, isLoading: isLoadingProjectInfo } = useQuery(
    ["getProjectInfo", { proyectName }],
    apiCalls.getProjectInfo,
    {
      enabled: isTheProject,
      onSuccess: (data) => {
        //console.log("Proyect Info", data);
        if (data.status !== "ok") {
          historyHook.push("/main");
          return;
        }
        setIndex(data.project.index);
      },
      onError: (error) => {
        historyHook.push("/main");
      },
    }
  );
  return (
    <Fragment>
      {!projectInfo || isLoadingProjectInfo ? (
        <Waiting />
      ) : (
        <Switch>
          <Route exact path={path} component={Project} />
          <Route path={`${path}/foro`} component={CreateForum} />
        </Switch>
      )}
    </Fragment>
  );
};

export default ProjectRouter;
