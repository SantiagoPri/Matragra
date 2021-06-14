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
import ProjectContextProvider from "./contexts/ProjectContext";
import GeneralContextProvider from "./contexts/GeneralContext";
import Main from "./components/main/main";
import ProjectRouter from "./components/ProjectRouter";
import Footer from "./components/footer/footer";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <Router>
        <QueryClientProvider client={queryClient}>
          <ApiContextProvider>
            <GeneralContextProvider>
              <ProjectContextProvider>
                <Navbar />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <SignRoute path="/registrarme" component={Registrarme} />
                  <SignRoute path="/ingresar" component={Ingresar} />
                  <Route path="/documentacion" component={MatragraDoc} />
                  <PrivateRoute path="/main" component={Main} />
                  <PrivateRoute
                    path="/project/:proyectName"
                    component={ProjectRouter}
                  />
                </Switch>
                <Footer />
              </ProjectContextProvider>
            </GeneralContextProvider>
          </ApiContextProvider>
        </QueryClientProvider>
      </Router>
    </div>
  );
}

export default App;
