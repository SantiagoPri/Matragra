import React, { Fragment, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { ModalEvent } from "./ModalEvent";
import "./styleEvent.css";

const Events = (props) => {
  const { title, eventsList } = props;

  // Lista de eventos.
  const [events, setEvents] = useState([]);

  // Evento a mostrar en detalle
  const eventDetail = {
    date: "24-07-2021",
    time: "18:00",
    description: "Trabajo finalizado",
  };

  useEffect(() => {
    if (eventsList !== undefined) {
      setEvents(eventsList);
    }
  }, []);

  // Funciones
  const ButtonCalendar = (e) => {
    setEvents([
      ...events,
      { date: "24-07-2021", time: "18:00", description: "Trabajo finalizado" },
    ]); // funcion de prueba.... cambiar por la logica de vanzar etapa.
  };

  // ModalContainer
  const [isOpened, setIsOpened] = useState(false);
  const [isOpenedDetail, setIsOpenedDetail] = useState(false);

  const openModal = () => {
    setIsOpened(true);
  };

  const closeModal = () => {
    setIsOpened(false);
  };

  const openModalDetail = () => {
    setIsOpenedDetail(true);
  };

  const closeModalDetail = () => {
    setIsOpenedDetail(false);
  };

  return (
    <Fragment>
      <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
        <div className="card bg-dark">
          <div className="card-header card-title text-light font-weight-bold">
            {title}
          </div>

          <div className="card-body">
            <div className="row mb-3">
              <div className="col-xs-4 col-sm-2 col-md-2 col-lg-4 icono-event">
                <FaAngleLeft></FaAngleLeft>
              </div>
              <div className="col-xs col-sm col-md col-lg icono-event font-weight-bold">
                Hoy
              </div>
              <div className="col-xs-4 col-sm-2 col-md-2 col-lg-4 icono-event">
                <FaAngleRight></FaAngleRight>
              </div>
            </div>

            {events.map((event, index) => {
              return (
                <div key={index} className="card-event border-success mb-3">
                  <div className="event-body" onClick={() => openModalDetail()}>
                    <div className="text-white">
                      <span className="">{event.date}</span>
                      <span> - </span>
                      <span className="">{event.time}</span>
                    </div>
                    <hr className="card-division"></hr>
                    <p className="card-text"> {event.description} </p>
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => openModal()}
              type="button"
              className="btn button-submit mt-3"
              style={{ backgroundColor: "rgb(79, 79, 195)" }}
            >
              Nuevo evento
            </button>
          </div>
        </div>
      </div>

      <Fragment>
        <ModalEvent
          title="Nuevo Evento"
          isOpened={isOpened}
          onClose={closeModal}
          event={null}
        ></ModalEvent>
      </Fragment>

      <Fragment>
        <ModalEvent
          title="Evento"
          isOpened={isOpenedDetail}
          onClose={closeModalDetail}
          event={eventDetail}
        ></ModalEvent>
      </Fragment>
    </Fragment>
  );
};

export default Events;
