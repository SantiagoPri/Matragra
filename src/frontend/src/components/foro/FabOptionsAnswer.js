import React, { Fragment } from 'react';
import { FaEdit } from "react-icons/fa";
import "./Style.css";

export const FabOptionsAnswer = () =>
{
    // Logica para insertar texto a la respuesta.
    const createText = () =>
    {
        //
    }


    return (
        <Fragment>
            <div className="fab-content">
                <div className="fab-container">
                    <div className="fab fab-icon-holder" onClick={() => createText()}>
                        <FaEdit></FaEdit>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
