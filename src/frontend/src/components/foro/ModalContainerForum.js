import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { ForumContext } from "../../contexts/ForoContext";
import { ProjectContext } from "../../contexts/ProjectContext";
import "./Style.css";

const modalContainer = document.querySelector("#modalContainer");

export const ModalContainerForum = ({ isOpened, onClose }) => {
  const { name } = useContext(ProjectContext);
  const { handleModalChange, newForo, startForum } = useContext(ForumContext);
  const handleClick = () => {
    startForum(name);
    onClose();
  };
  return isOpened
    ? ReactDOM.createPortal(
        <div className="modal-react" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content rounded-3">
              <div className="modal-header">
                <h5 className="text-dark font-weight-bold">Nuevo Tema</h5>
                <button type="button" className="close" onClick={onClose}>
                  <span>&times;</span>
                </button>
              </div>

              {/* <div className="modal-body">{ children }</div> */}

              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="list">Seleccione una etapa</label>
                  <select
                    className="form-control"
                    id="list"
                    name="phase"
                    value={newForo.phase}
                    onChange={handleModalChange}
                  >
                    <option value="phase0">Etapa 0</option>
                    <option value="phase1">Etapa 1</option>
                    <option value="phase2">Etapa 2</option>
                    <option value="phase3">Etapa 3</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="item">Nombre del item</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Nombre del nuevo item"
                    name="foroName"
                    onChange={handleModalChange}
                  ></input>
                </div>

                <div className="form-group row mr-1">
                  <div className="col"></div>
                  <button
                    type="submit"
                    className="btn btn-primary col-3"
                    onClick={handleClick}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        modalContainer
      )
    : null;
};
