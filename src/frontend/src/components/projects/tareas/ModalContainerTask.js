import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./Style.css";

const modalContainer = document.querySelector("#modalContainer");

export const ModalContainerTask = ({ children, isOpened,}) =>
{
    return (isOpened?
        ReactDOM.createPortal(
            <div className="modal-react" tabIndex="-1" role="dialog" >
                <div className="modal-center modal-dialog-centered" role="document" >
                  <div className="modal-content modal-content2"  >
                    <>{ children }</>
                  </div>
                </div>
            </div>,
            modalContainer
          )
        : null
    )
}