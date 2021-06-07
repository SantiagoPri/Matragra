import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navBar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./helpers/specialRoutes/privateRoute";
import SignRoute from "./helpers/specialRoutes/signRoute";
import Home from "./components/Home";
import Registrarme from "./components/sign/Registrarme";
import Ingresar from "./components/sign/Ingresar";
import MatragraDoc from "./components/docs/matragradoc";
import { QueryClient, QueryClientProvider } from "react-query";
import ApiContextProvider from "./contexts/ApiContext";
import Main from "./components/main/main";
import Project from "./components/projects/project";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <Router>
        <QueryClientProvider client={queryClient}>
          <ApiContextProvider>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Home} />
              <SignRoute path="/registrarme" component={Registrarme} />
              <SignRoute path="/ingresar" component={Ingresar} />
              <Route path="/documentacion" component={MatragraDoc} />
              <PrivateRoute path="/main" component={Main} />
              <Route path="/project" component={Project} />
            </Switch>
          </ApiContextProvider>
        </QueryClientProvider>
      </Router>
    </div>
  );
}

export default App;
