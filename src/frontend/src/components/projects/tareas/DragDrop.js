import React, { useEffect, useState, useContext } from "react";
import { ProjectContext } from "../../../contexts/ProjectContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import "./Style.css";
import { FaFileMedical, FaGripHorizontal, FaTimes } from "react-icons/fa";

export const DragDrop = ({ modalTitle, onClose }) => {
  const { updatePhase, visiblePhase, visibleIndex } =
    useContext(ProjectContext);
  //const [stateTitles, setStateTitles] = useState([]);

  // los estados a mostrar.
  const [state, setState] = useState([]);

  // cargar las sub-tareas en los estados correspondientes.
  useEffect(() => {
    const taskId = `task#${modalTitle.current}`;
    const subTareas = visiblePhase[taskId].subTask
      ? visiblePhase[taskId].subTask
      : {};
    let completeState = getTitles(visibleIndex);
    Object.entries(subTareas).forEach((subTarea, index) => {
      const [key, elemento] = subTarea;
      const { state } = elemento;
      completeState[state].items = [
        ...completeState[state].items,
        { ...elemento, id: key },
      ];
    });
    setState(completeState);
  }, [visiblePhase]);

  // funcion al arrastrar una sub-tarea.
  const handleDragEnd = ({ destination, source }) => {
    // Al arrastrar el cuadro y no se colca en ningun estado, retorna el estado anterior.
    if (!destination) {
      return;
    }
    // Si la caja se arrastra un estado que no este registrado o fuera de los estados.
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }
    // Crea una copia de la sub-tarea antes de eliminarla del estado anterior.
    let itemCopy = { ...state[source.droppableId].items[source.index] };
    itemCopy.state = parseInt(destination.droppableId); // cambia el estado de la sub-tarea.

    //Cambio visual
    setState((list) => {
      list = [...list];
      // Elimina la sub-tarea del arreglo del estado anterior.
      list[source.droppableId].items.splice(source.index, 1);

      // Agrega la sub-tarea al arreglo del nuevo estado.
      list[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );
      return list;
    });
    // fin del cambio visual

    const taskId = `task#${modalTitle.current}`;
    const { id, ...element } = itemCopy;
    const subTareas = visiblePhase[taskId].subTask
      ? visiblePhase[taskId].subTask
      : {};
    subTareas[id] = element;
    const taskToUpdate = { ...visiblePhase[taskId], subTask: subTareas };
    updatePhase(taskId, taskToUpdate);
  };

  //-------
  const [stateCreate, setStateCreate] = useState(false); // mostrar / ocultar crear nueva sub-tarea.
  const [task, setTask] = useState(""); // crear nueva sub-tarea.

  const createSubTask = () => {
    const taskId = `task#${modalTitle.current}`;
    const element = { name: task, state: 0 };
    const subTareas = visiblePhase[taskId].subTask
      ? visiblePhase[taskId].subTask
      : {};
    subTareas[`subTask#${task}`] = element;
    const taskToUpdate = { ...visiblePhase[taskId], subTask: subTareas };
    updatePhase(taskId, taskToUpdate);
    setStateCreate(!stateCreate);
    setTask("");
  };

  const agregarSubTask = () => {
    setStateCreate(!stateCreate);
  };

  return (
    <div>
      <div className="modal-header">
        <h5 className="modal-title font-weight-bold text-light">
          {modalTitle.current}
        </h5>
        {stateCreate ? (
          <div
            className="text-center icono-task close"
            onClick={() => agregarSubTask()}
          >
            <FaGripHorizontal></FaGripHorizontal>
          </div>
        ) : (
          <div
            className="text-center icono-task close"
            onClick={() => agregarSubTask()}
          >
            <FaFileMedical></FaFileMedical>
          </div>
        )}

        <div className="text-center icono-task close" onClick={onClose}>
          <FaTimes></FaTimes>
        </div>
      </div>
      <div className="modal-body">
        {stateCreate ? (
          <>
            <div className="form-group col-xs-9 col-sm-10 col-md-10 col-lg-11">
              <label className="text-white">Nombre:</label>
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
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-dark"
                style={{ backgroundColor: "#4f4fc3" }}
                onClick={() => createSubTask()}
              >
                Crear sub-tarea
              </button>
            </div>
          </>
        ) : (
          <div className="row">
            <DragDropContext onDragEnd={handleDragEnd}>
              {state.map((data, key) => {
                return (
                  <div
                    className="col-xs-6 col-sm-6 col-md-6 col-lg-3"
                    key={key.toString()}
                    style={{ minWidth: 200 }}
                  >
                    <div
                      className="card card-size"
                      style={{ backgroundColor: "transparent" }}
                    >
                      <div className="card-header card-title text-light font-weight-bold">
                        {data.title}
                      </div>
                      <div className="card-body">
                        <Droppable droppableId={key.toString()}>
                          {(provided) => {
                            return (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={"droppable-col"}
                              >
                                {data.items.map((el, index) => {
                                  return (
                                    <Draggable
                                      key={el.id.toString()}
                                      index={index}
                                      draggableId={el.id.toString()}
                                    >
                                      {(provided, snapshot) => {
                                        return (
                                          <div
                                            className={`item ${
                                              snapshot.isDragging && "dragging"
                                            }`}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            {el.name}
                                          </div>
                                        );
                                      }}
                                    </Draggable>
                                  );
                                })}
                                {provided.placeholder}
                              </div>
                            );
                          }}
                        </Droppable>
                      </div>
                    </div>
                  </div>
                );
              })}
            </DragDropContext>
          </div>
        )}
      </div>
    </div>
  );
};

function getTitles(id) {
  switch (id) {
    case 1:
      return [
        { title: "Por hacer", items: [] },
        { title: "En Diseño", items: [] },
        { title: "Hecho", items: [] },
      ];
    case 2:
      return [
        { title: "Por hacer", items: [] },
        { title: "En progreso", items: [] },
        { title: "En pruebas", items: [] },
        { title: "Hecho", items: [] },
      ];
    case 3:
      return [
        { title: "Por hacer", items: [] },
        { title: "En Integración", items: [] },
        { title: "Pruebas De Integración", items: [] },
        { title: "Integrado", items: [] },
      ];
    default:
      return [];
  }
}
