import React, { useContext } from "react";
import { Fragment } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import "./styleEvent.css";
import useEvent from "./useEvent";

const modalContainer = document.querySelector("#modalContainer");

export const ModalEvent = ({ title, isOpened, onClose, event }) => {
  const { handleChange, handleSubmit, values, errors, validateErrors } =
    useEvent();

  return isOpened
    ? ReactDOM.createPortal(
        <div className="modal-react" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content rounded-3">
              <div className="modal-header">
                <h5 className="text-dark font-weight-bold">{title}</h5>
                <div
                  className="text-center icono-modal close"
                  onClick={onClose}
                >
                  <FaTimes></FaTimes>
                </div>
              </div>

              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  {/* Asunto */}
                  <div className="form-group">
                    <span className="text-danger">* </span>{" "}
                    <label htmlFor="asunto">Asunto</label>
                    <input
                      type="text"
                      className="form-control"
                      name="asunto"
                      placeholder="Asunto del evento..."
                      value={values.asunto}
                      onChange={handleChange}
                      onBlur={validateErrors}
                    ></input>
                    {errors.asunto && (
                      <p className="text-danger ml-1 mt-1">{errors.asunto}</p>
                    )}
                  </div>

                  {/* Descripción */}
                  <div className="form-group">
                    <label htmlFor="description">Descripción</label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      placeholder="Descripción del evento..."
                      value={values.description}
                      onChange={handleChange}
                      onBlur={validateErrors}
                    ></input>
                  </div>

                  {/* link */}
                  <div className="form-group">
                    <label htmlFor="link">Link</label>
                    <input
                      type="url"
                      className="form-control"
                      name="link"
                      placeholder="Link del evento..."
                      value={values.link}
                      onChange={handleChange}
                      onBlur={validateErrors}
                    ></input>
                  </div>

                  {/* Fecha */}
                  <div className="form-group">
                    <span className="text-danger">* </span>{" "}
                    <label htmlFor="item">Fecha</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={values.date.valueOf()}
                      onChange={handleChange}
                      onBlur={validateErrors}
                      min="2021-01-01"
                      max="2023-12-31"
                    ></input>
                    {errors.date && (
                      <p className="text-danger ml-1 mt-1">{errors.date}</p>
                    )}
                  </div>

                  {/* Hora */}
                  <div className="form-group">
                    <label htmlFor="time">Hora</label>
                    <input
                      type="time"
                      className="form-control"
                      name="time"
                      value={values.time}
                      onChange={handleChange}
                      onBlur={validateErrors}
                    ></input>
                  </div>

                  {/* Duración */}
                  <div className="form-group">
                    <label htmlFor="duration">Duración</label>
                    <input
                      type="number"
                      className="form-control"
                      name="duration"
                      list="listduration"
                      value={values.duration}
                      onChange={handleChange}
                      onBlur={validateErrors}
                    ></input>
                    <datalist id="listduration">
                      <option value="15"></option>
                      <option value="30"></option>
                      <option value="45"></option>
                      <option value="60"></option>
                    </datalist>
                  </div>

                  <div className="form-group row mr-1">
                    <div className="col"></div>
                    <button type="submit" className="btn  col-3 button-submit">
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>,
        modalContainer
      )
    : null;
};
