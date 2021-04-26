import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Registrarme from "./components/sign/Registrarme";
import Ingresar from "./components/sign/Ingresar";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <Router>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/registrarme" component={Registrarme} />
            <Route path="/ingresar" component={Ingresar} />
          </Switch>
        </QueryClientProvider>
      </Router>
    </div>
  );
}

export default App;
