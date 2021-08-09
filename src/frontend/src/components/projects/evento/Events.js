import React, { Fragment, useEffect, useState, useContext } from "react";
import { useQuery } from "react-query";
import { ApiContext } from "../../../contexts/ApiContext";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { ModalEvent } from "./ModalEvent";
import "./styleEvent.css";

const Events = (props) => {
  const { projectName } = props;
  const { apiCalls } = useContext(ApiContext);

  const [epoch, setEpoch] = useState("present");

  // Evento a mostrar en detalle
  const eventDetail = {
    date: "24-07-2021",
    time: "18:00",
    description: "Trabajo finalizado",
  };

  const { data: events } = useQuery(
    ["getEvents", { projectName }],
    apiCalls.getEvents
  );

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

  const toFuture = () => {
    if (epoch === "past") {
      setEpoch("present");
    }
    if (epoch === "present") {
      setEpoch("future");
    }
  };

  const topast = () => {
    if (epoch === "future") {
      setEpoch("present");
    }
    if (epoch === "present") {
      setEpoch("past");
    }
  };

  const [title, setTitle] = useState({
    past: "Pasados",
    present: "Hoy",
    future: "Proximos",
  });

  return (
    <Fragment>
      <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
        <div className="card bg-dark">
          <div className="card-header card-title text-light font-weight-bold">
            Eventos
          </div>

          <div className="card-body">
            <div className="row mb-3">
              <div
                className="col-xs-3 col-sm-1 col-md-1 col-lg-3 icono-event"
                onClick={topast}
              >
                <FaAngleLeft></FaAngleLeft>
              </div>
              <div className="col-xs col-sm col-md col-lg icono-event font-weight-bold">
                {title[epoch]}
              </div>
              <div
                className="col-xs-3 col-sm-1 col-md-1 col-lg-3 icono-event"
                onClick={toFuture}
              >
                <FaAngleRight></FaAngleRight>
              </div>
            </div>

            {!events
              ? null
              : events[epoch].map((event, index) => {
                  return (
                    <div key={index} className="card-event border-success mb-3">
                      <div
                        className="event-body"
                        onClick={() => openModalDetail()}
                      >
                        <div className="text-white">
                          {epoch === "present" ? (
                            <span> {`${event.time}`} </span>
                          ) : (
                            <span> {`${event.date} - ${event.time}`} </span>
                          )}
                        </div>
                        <hr className="card-division"></hr>
                        <p className="card-text"> {event.eventName} </p>
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
