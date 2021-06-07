import React, { Fragment, useEffect, useState } from "react";

const Events = (props) => {
  const { title, day, eventsList } = props;

  // Lista de eventos.
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (eventsList !== undefined) {
      setEvents(eventsList);
    }
  }, []);

  // Funciones
  const ButtonCalendar = (e) => {
    setEvents([
      ...events,
      { hour: "18:00 - 20:15", description: "Trabajo finalizado" },
    ]); // funcion de prueba.... cambiar por la logica de vanzar etapa.
  };

  return (
    <Fragment>
      <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
        <div className="card bg-dark">
          <div className="card-header card-title text-light font-weight-bold">
            {title}
          </div>

          <div className="card-body">
            <h6 className="text-light text-left">{day}</h6>
            <ul>
              {events.map((event) => {
                return (
                  <li className="bg-primary text-light mt-3 mb-3">
                    <p className="my-0 flex-fw text-sm text-light text-left mx-3">
                      <span className="text-inverse op-8 text-light">
                        {event.hour}
                      </span>
                      <span className="text-inverse op-8 text-light mx-3">
                        {event.description}
                      </span>
                    </p>
                  </li>
                );
              })}
            </ul>
            <button
              onClick={() => ButtonCalendar()}
              type="button"
              className="btn btn-rounded btn-secondary mt-3"
              style={{ backgroundColor: "#4f4fc3" }}
            >
              Calendario
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Events;
