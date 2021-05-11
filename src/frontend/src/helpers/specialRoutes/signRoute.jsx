import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

const SignRoute = ({ component: Component, ...props }) => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    const decoded = jwt_decode(jwt);
    const exp = new Date(decoded.exp * 1000);
    if (exp >= new Date().getTime()) {
      return <Redirect to="/main" />;
    }
  }
  return (
    <Route {...props}>
      <Component />
    </Route>
  );
};

export default SignRoute;
