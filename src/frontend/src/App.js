import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Registrarme from "./components/sign/Registrarme";
import Ingresar from "./components/sign/Ingresar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/registrarme" exact component={Registrarme} />
          <Route path="/ingresar" exact component={Ingresar} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
