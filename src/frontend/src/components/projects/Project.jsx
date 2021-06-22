import React, { Fragment } from "react";
import Events from "./Events";
import ListItems from "./ListItems";
import ProgressBar from "./ProgressBar";
import Stages from "./Stages";
import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { Task } from "./tareas/Task";

function Project() {
  const { name, fase0 } = useContext(ProjectContext);

  // Lista de las etapas a mostrar.
  const etapas = [
    { name: "Etapa 1", state: 1 },
    { name: "Etapa 2", state: 1 },
    { name: "Etapa 3", state: 2 },
    { name: "Etapa 4", state: 3 },
    { name: "Etapa 5", state: 3 },
  ];

  // Lista de eventos.
  const events = [
    { hour: "06:15 - 07:00", description: "Trabajo realizado numero 1" },
    { hour: "07:00 - 08:00", description: "Trabajo realizado numero 2" },
    { hour: "09:00 - 11:00", description: "Trabajo realizado numero 3" },
    { hour: "12:00 - 14:00", description: "Trabajo realizado numero 4" },
    { hour: "16:00 - 18:00", description: "Trabajo realizado numero 5" },
  ];

  // Lista de items.
  const items = [
    "Lorem ipsum dolor sit 1",
    "Lorem ipsum dolor sit 2",
    "Lorem ipsum dolor sit 3",
  ];

  return (
    <Fragment>
      <div
        className="container-fluid text-center"
        style={{ backgroundColor: "#282c34" }}
      >
        <div className="col-12 row">
          <h1 className="col-sm-10 text-center text-white">{name}</h1>
          <a href="/users/123" className="col-sm-2 text-center text-white">
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
          {/* Etapas */}
          <Stages title="Etapas" listStages={etapas}></Stages>

          {/* Texto central */}
          <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <Task />
          </div>

          {/* Eventos */}
          <Events
            title="Eventos"
            day="Lunes 7 junio"
            eventsList={events}
          ></Events>
        </div>

        <div className="row mt-3">
          {/* Lista 1 */}
          <ListItems listItems={items}></ListItems>

          {/* Lista 2 */}
          <ListItems listItems={items}></ListItems>

          {/* Botones */}
          <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
            <div className="card" style={{ backgroundColor: "transparent" }}>
              <div className="card-body">
                <button
                  type="button"
                  className="col-7 btn btn-rounded btn-secondary mt-3"
                  style={{ backgroundColor: "#4f4fc3" }}
                >
                  Boton 1
                </button>
                <button
                  type="button"
                  className="col-7 btn btn-rounded btn-secondary mt-3"
                  style={{ backgroundColor: "#4f4fc3" }}
                >
                  Boton 2
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
export default Project;
