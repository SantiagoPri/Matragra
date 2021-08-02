import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Style.css";

const modalContainer = document.querySelector("#modalContainer");

export const ModalContainerForum = ({ title, children, isOpened, onClose}) =>
{
  return (isOpened?
    ReactDOM.createPortal(
        <div className="modal-react" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content rounded-3">

                <div className="modal-header">
                  <h5 className="text-dark font-weight-bold">{title}</h5>
                  <button type="button" className="close" onClick={onClose} ><span>&times;</span></button>
                </div>

                {/* <div className="modal-body">{ children }</div> */}


                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="list">Seleccione una etapa</label>
                    <select className="form-control" id="list">
                      <option selected>ninguna</option>
                      <option>Etapa 0</option>
                      <option>Etapa 1</option>
                      <option>Etapa 2</option>
                      <option>Etapa 3</option>
                      <option>Etapa 4</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="item">Nombre del item</label>
                    <input type="email" className="form-control" placeholder="Nombre del nuevo item"></input>
                  </div>
                  
                  <div className="form-group row mr-1">
                    <div className="col"></div>
                    <button type="submit" className="btn btn-primary col-3">Guardar</button>
                  </div>
                </div>

                {/* <div className="modal-footer">
                    <button type="button" className="btn btn-dark" style={{backgroundColor: '#4f4fc3'}}>Crear proyecto</button>
                </div> */}

              </div>
            </div>
        </div>,
        modalContainer
      )
    : null
  )
}




