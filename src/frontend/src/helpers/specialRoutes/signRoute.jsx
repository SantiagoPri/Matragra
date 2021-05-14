import { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ApiContext } from "./../../contexts/ApiContext";

const SignRoute = ({ component: Component, ...props }) => {
  const { setIsLogged } = useContext(ApiContext);
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      const decoded = jwt_decode(jwt);
      const exp = new Date(decoded.exp * 1000);
      if (exp >= new Date().getTime()) {
        setIsLogged(true);
        return <Redirect to="/main" />;
      }
      localStorage.removeItem("jwt");
    }
    setIsLogged(false);
  });
  return (
    <Route {...props}>
      <Component />
    </Route>
  );
};

export default SignRoute;
