import React, { useState, useContext } from "react";
import { ProjectContext } from "../../../contexts/ProjectContext";
import { Fragment } from "react";

export const NewTask = ({ viewTask, onClose }) => {
  const { visiblePhase, updatePhase } = useContext(ProjectContext);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  const createTask = () => {
    const taskName = `task#${task}`;
    if (visiblePhase[taskName]) {
      return; //TODO: what to do if the task name already exists?
    }
    updatePhase(`task#${task}`, { name: task, description });
    onClose();
  };

  return viewTask.current === null ? (
    <Fragment>
      <div className="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          autoComplete="off"
          placeholder="Nueva Tarea"
          onChange={(text) => setTask(text.target.value)}
          value={task}
        ></input>
      </div>

      <div className="form-group">
        <label>Descripción:</label>
        <textarea
          className="form-control"
          id="descripcion"
          rows="3"
          onChange={(text) => setDescription(text.target.value)}
          value={description}
        ></textarea>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-dark"
          style={{ backgroundColor: "#4f4fc3" }}
          onClick={() => createTask()}
        >
          Crear Tarea
        </button>
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          autoComplete="off"
          placeholder="Nueva Tarea"
          onChange={(text) => setTask(text.target.value)}
          value={viewTask.current.name}
          readOnly
        ></input>
      </div>

      <div className="form-group">
        <label>Descripción:</label>
        <textarea
          className="form-control"
          id="descripcion"
          rows="3"
          onChange={(text) => setDescription(text.target.value)}
          value={viewTask.current.description}
          readOnly
        ></textarea>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-dark"
          style={{ backgroundColor: "#4f4fc3" }}
          onClick={() => createTask()}
          readOnly
        >
          Crear Tarea
        </button>
      </div>
    </Fragment>
  );
};
