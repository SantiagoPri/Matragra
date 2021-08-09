import { useContext, useEffect, Fragment } from "react";
import { Route, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ApiContext } from "./../../contexts/ApiContext";
import Waiting from "../../components/waiting/waiting";

const PrivateRoute = ({ component: Component, ...props }) => {
  const { setIsLogged, setJwt, isLogged } = useContext(ApiContext);
  const historyHook = useHistory();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      setIsLogged(false);
      setJwt("");
      historyHook.push("/ingresar");
      return;
    }
    const decoded = jwt_decode(jwt);
    const exp = new Date(decoded.exp * 1000);
    if (exp < new Date().getTime()) {
      localStorage.removeItem("jwt");
      setIsLogged(false);
      setJwt("");
      historyHook.push("/ingresar");
      return;
    }
    setIsLogged(true);
    setJwt(jwt);
  }, []);
  return (
    <Fragment>
      {isLogged ? (
        <Route {...props}>
          <Component />
        </Route>
      ) : (
        <Waiting />     
      )}
    </Fragment>
  );
};

export default PrivateRoute;
