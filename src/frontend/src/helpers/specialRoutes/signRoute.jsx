import { useContext, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ApiContext } from "./../../contexts/ApiContext";

const SignRoute = ({ component: Component, ...props }) => {
  const { setIsLogged, setJwt } = useContext(ApiContext);
  const historyHook = useHistory();
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const decoded = jwt_decode(jwt);
      const exp = new Date(decoded.exp * 1000);
      if (exp >= new Date().getTime()) {
        setIsLogged(true);
        setJwt(jwt);
        historyHook.push("/main");
        return;
      }
      localStorage.removeItem("jwt");
    }
    setIsLogged(false);
    setJwt("");
  }, []);
  return (
    <Route {...props}>
      <Component />
    </Route>
  );
};

export default SignRoute;
