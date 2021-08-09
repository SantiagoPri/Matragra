import React, { Fragment, useState, useEffect } from "react";
import Events from "./evento/Events";
import ListItems from "./integrantes/ListItems";
import ProgressBar from "./ProgressBar";
import Stages from "./Stages";
import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import Phases from "./Phases";

function Project() {
  const { name, index, done } = useContext(ProjectContext);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    if (done) {
      setPorcentaje(100);
      return;
    }
    if (index) {
      const porcentajeMap = {
        0: 0,
        1: 20,
        2: 50,
        3: 80,
      };
      setPorcentaje(porcentajeMap[index]);
    }
  }, [index, done]);

  return (
    <Fragment>
      <div
        className="container-fluid text-center"
        style={{ backgroundColor: "#282c34" }}
      >
        <div className="col-12 row">
          <h1 className="col-sm-10 text-center text-white">{name}</h1>
          <a href={`${name}/foro`} className="col-sm-2 text-center text-white">
            Ir al chat
          </a>
        </div>
        <hr style={{ backgroundColor: "#4f4fc3" }}></hr>

        {/* Barra de progreso */}
        <ProgressBar
          className=""
          key={1}
          color="#4f4fc3"
          porcentaje={porcentaje}
        />

        <div className="row mt-3">
          <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3">
            {/* Etapas */}
            <Stages />
            <br />
            {/* Integrantes */}
            <ListItems projectName={name}></ListItems>
          </div>

          {/* Fase */}
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <Phases />
          </div>

          {/* Eventos */}
          {name ? <Events projectName={name}></Events> : null}
        </div>
      </div>
    </Fragment>
  );
}
export default Project;
