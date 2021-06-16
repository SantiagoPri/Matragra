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

const ProjectRouter = () => {
  const { apiCalls } = useContext(ApiContext);
  const { name, index } = useContext(ProjectContext);
  const { proyectName } = useParams();
  const { url, path } = useRouteMatch();
  const historyHook = useHistory();
  const [isTheProject, setIsTheProject] = useState(false);
  useEffect(() => {
    if (proyectName === name) {
      setIsTheProject(true);
    } else {
      historyHook.push("/main");
    }
  }, []);

  const { data, isLoading } = useQuery(
    ["getProjectDetails", { proyectName, index }],
    apiCalls.getProjectDetails,
    {
      enabled: isTheProject,
      onSuccess: (data) => {
        if (!data.projectDetail) {
          historyHook.push("/main");
          return;
        }
        console.log("data", data);
      },
      onError: (error) => {
        historyHook.push("/main");
        return;
      },
    }
  );
  return (
    <Fragment>
      {!data || isLoading ? (
        <Waiting />
      ) : (
        <Switch>
          <Route exact path={`${path}`} component={Project} />
          {/* <PrivateRoute path="/main" component={Main} /> */}
        </Switch>
      )}
    </Fragment>
  );
};

export default ProjectRouter;
