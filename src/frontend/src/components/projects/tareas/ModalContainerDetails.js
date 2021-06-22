import React from "react";
import ReactDOM from "react-dom";
import "./Style.css";

const modalContainer = document.querySelector("#modalContainer");

export const ModalContainerDetails = ({ title, children, isOpened, onClose }) =>
{
    return (isOpened?
        ReactDOM.createPortal(
            <div className="modal-react" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content rounded-3">

                    <div className="modal-header">
                      <h5 className="modal-title font-weight-bold">{title}</h5>
                      <button type="button" className="close" onClick={onClose} ><span>&times;</span></button>
                    </div>

                    <div className="modal-body">{ children }</div>

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