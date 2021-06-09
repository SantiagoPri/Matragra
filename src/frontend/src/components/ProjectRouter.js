import { ApiContext } from "../contexts/ApiContext";
import { ProjectContext } from "../contexts/ProjectContext";
import { Fragment, useContext } from "react";
import { useQuery } from "react-query";
import Home from "./Home";
import {
  useParams,
  Switch,
  Route,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import Project from "./projects/project";

const ProjectRouter = () => {
  const { apiCalls } = useContext(ApiContext);
  const { setName, setFase0 } = useContext(ProjectContext);
  const { proyectName } = useParams();
  const { url, path } = useRouteMatch();
  const historyHook = useHistory();
  const { isLoading } = useQuery(
    ["getAllProjects", proyectName],
    apiCalls.getProjectDetails,
    {
      onSuccess: (data) => {
        if (!data.projectDetail) {
          historyHook.push("/main");
          return;
        }
        setName(data.projectDetail.pk);
        setFase0(data.projectDetail.fase0);
      },
    }
  );
  return (
    <Fragment>
      {isLoading ? (
        <Home />
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
