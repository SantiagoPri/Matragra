import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { useMutation } from "react-query";
import { FaPlus, FaTimes } from "react-icons/fa";
import { ApiContext } from "../../../contexts/ApiContext";
import { queryClient } from "../../../App";
import "./StyleModalImei.css";

const modalContainer = document.querySelector("#modalContainer");

export const ModalIntegrante = ({ title, isOpened, onClose, projectName }) => {
  const [email, setEmail] = useState("");
  const { apiCalls } = useContext(ApiContext);

  const { mutate: linkUser } = useMutation(apiCalls.linkUser, {
    onSuccess: async () => {
      await queryClient.refetchQueries(["getProjectMemebers"], {
        active: true,
      });
      onClose();
      setEmail("");
    },
    onError: (error) => {
      console.error(error);
    },
  });

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
                <form>
                  <div className="form-row align-items-center mb-3 mt-3 mr-2 ml-3">
                    <div className="form-group col-xs-12 col-sm-10 col-md-10 col-lg-10">
                      {/* <label htmlFor="imei" className="text-black">Imei</label> */}
                      <input
                        type="text"
                        className="form-control input-archivo"
                        name="imei"
                        placeholder="e-mail del usuario..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>

                    <div
                      onClick={() => linkUser({ email, projectName })}
                      className="form-group  text-center mt-0 mb-0 col-xs-12 col-sm-2 col-md-2 col-lg-2"
                    >
                      <figure>
                        <FaPlus className="icono-topics"></FaPlus>
                      </figure>
                    </div>
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
