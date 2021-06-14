import ReactDOM from "react-dom";
import { Modal } from "./styled";
import { useContext } from "react";
import { GeneralContext } from "../../contexts/GeneralContext";

const modalContainer = document.querySelector("#modalContainer");

export const NewProject = ({ title, children }) => {
  const { setNewProjectIsOpen, createProject } = useContext(GeneralContext);
  return ReactDOM.createPortal(
    <Modal tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title font-weight-bold">{title}</h5>
            <button
              type="button"
              className="close"
              onClick={() => {
                setNewProjectIsOpen(false);
              }}
            >
              <span>&times;</span>
            </button>
          </div>

          <div className="modal-body">{children}</div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={createProject}
              className="btn btn-dark"
              style={{ backgroundColor: "#4f4fc3" }}
            >
              Crear proyecto
            </button>
          </div>
        </div>
      </div>
    </Modal>,
    modalContainer
  );
};
