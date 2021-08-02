import React, { Fragment } from "react";
import Events from "./evento/Events";
import ListItems from "./ListItems";
import ProgressBar from "./ProgressBar";
import Stages from "./Stages";
import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import Phases from "./Phases";

function Project() {
  const { name } = useContext(ProjectContext);

  // Lista de eventos.
  const events = [
    { hour: "06:15 - 07:00", description: "Trabajo realizado numero 1" },
    { hour: "07:00 - 08:00", description: "Trabajo realizado numero 2" },
    { hour: "09:00 - 11:00", description: "Trabajo realizado numero 3" },
    { hour: "12:00 - 14:00", description: "Trabajo realizado numero 4" },
    { hour: "16:00 - 18:00", description: "Trabajo realizado numero 5" },
  ];

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
          totalEtapas={5}
          etapaActual={3}
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
          <Events title="Eventos" eventsList={events}></Events>
        </div>
      </div>
    </Fragment>
  );
}
export default Project;
