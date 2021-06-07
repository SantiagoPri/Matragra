import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";

const Stages = (props) => {
  const { title, listStages } = props;

  // Lista de las etapas.
  const [stages, setStages] = useState([]);

  useEffect(() => {
    if (listStages !== undefined) {
      setStages(listStages);
    }
  }, []);

  // Funciones
  const ButtonAdvanceStage = (e) => {
    setStages([...stages, { name: "Etapa 6", state: 1 }]); // funcion de prueba.... cambiar por la logica de vanzar etapa.
  };

  return (
    <Fragment>
      <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3">
        <div className="card bg-dark">
          <div className="card-header card-title text-light font-weight-bold">
            {title}
          </div>
          <div className="card-body">
            {stages.map((stage) => {
              switch (stage.state) {
                case 1: // retorna la etapa terminada
                  return (
                    <div class="text-light bg-success mb-2">
                      <h5 class="card-title m-1">{stage.name}</h5>
                    </div>
                  );
                case 2: // retorna la etapa pendiente
                  return (
                    <div class="text-light bg-warning mb-2">
                      <h5 class="card-title m-1">{stage.name}</h5>
                    </div>
                  );
                case 3: // retorna la etapa sin realizar
                  return (
                    <div class="text-light bg-danger mb-2">
                      <h5 class="card-title m-1">{stage.name}</h5>
                    </div>
                  );

                default:
                  break;
              }
            })}
            <button
              onClick={() => ButtonAdvanceStage()}
              type="button"
              class="btn btn-rounded btn-secondary mt-3"
              style={{ backgroundColor: "#4f4fc3" }}
            >
              Avanzar Etapa
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Stages;
