import { Verde, Amarillo, Rojo } from "./styled";
import React, { Fragment, useEffect, useState, useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";

const Stages = () => {
  const { index, setVisibleIndex, nextPhase, name } =
    useContext(ProjectContext);

  // Lista de las etapas.
  const [stages, setStages] = useState([]);

  useEffect(() => {
    setStages(updatePhases(index));
  }, [index]);

  // Funciones
  const ButtonAdvanceStage = () => {
    nextPhase();
  };

  const showClickedStage = (stage) => {
    const { id, state } = stage;
    if (state > 2) {
      return;
    }
    setVisibleIndex(id);
  };

  return (
    <Fragment>
      <div className="card bg-dark">
        <div className="card-header card-title text-light font-weight-bold">
          Fases
        </div>
        <div className="card-body">
          {stages.map((stage) => {
            switch (stage.state) {
              case 1: // retorna la etapa terminada
                return (
                  <Verde
                    onClick={() => {
                      showClickedStage(stage);
                    }}
                    key={stage.name}
                    className="mb-2 btn-rounded"
                  >
                    <h5 className="card-title m-1">{stage.name}</h5>
                  </Verde>
                );
              case 2: // retorna la etapa pendiente
                return (
                  <Amarillo
                    onClick={() => {
                      showClickedStage(stage);
                    }}
                    key={stage.name}
                    className="mb-2"
                  >
                    <h5 className="card-title m-1">{stage.name}</h5>
                  </Amarillo>
                );
              case 3: // retorna la etapa sin realizar
                return (
                  <Rojo
                    onClick={() => {
                      showClickedStage(stage);
                    }}
                    key={stage.name}
                    className="mb-2"
                  >
                    <h5 className="card-title m-1">{stage.name}</h5>
                  </Rojo>
                );

              default:
                break;
            }
          })}
          <button
            onClick={ButtonAdvanceStage}
            type="button"
            className="btn btn-rounded btn-secondary mt-3"
            style={{ backgroundColor: "#4f4fc3" }}
          >
            Avanzar Etapa
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Stages;

function updatePhases(index) {
  const etapas = [
    { id: 0, name: "Etapa 0" },
    { id: 1, name: "Etapa 1" },
    { id: 2, name: "Etapa 2" },
    { id: 3, name: "Etapa 3" },
  ];
  return etapas.map((etapa) => {
    if (etapa.id === index) {
      return { ...etapa, state: 2 };
    }
    if (etapa.id > index) {
      return { ...etapa, state: 3 };
    }
    if (etapa.id < index) {
      return { ...etapa, state: 1 };
    }
  });
}
