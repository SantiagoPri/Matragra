import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import "./Style.css";
import {
  FaFileMedical,
  FaGripHorizontal,
  FaRegWindowClose,
  FaTimes,
} from "react-icons/fa";

export const DragDrop = ({ subTasks, title, onClose }) => {
  const [text, setText] = useState("");

  // los estados a mostrar.
  const [state, setState] = useState([
    {
      // estado 1
      title: "Por hacer",
      items: [],
    },
    {
      // estado 2
      title: "En progreso",
      items: [],
    },
    {
      // estado 3
      title: "En pruebas",
      items: [],
    },
    {
      // estado 4
      title: "Hecho",
      items: [],
    },
  ]);

  // cargar las sub-tareas en los estados correspondientes.
  useEffect(() => {
    if (subTasks) {
      setState((list) => {
        list = [...list];

        subTasks.current.forEach((elemento) => {
          switch (elemento.state) {
            case 0:
              list[0].items = [...list[0].items, elemento];
              break;
            case 1:
              list[1].items = [...list[1].items, elemento];
              break;
            case 2:
              list[2].items = [...list[2].items, elemento];
              break;
            case 3:
              list[3].items = [...list[3].items, elemento];
              break;

            default:
              break;
          }
        });
        return list;
      });
    }
  }, []);

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
  };

  //-------
  const [stateCreate, setStateCreate] = useState(false); // mostrar / ocultar crear nueva sub-tarea.
  const [task, setTask] = useState(""); // crear nueva sub-tarea.

  const createSubTask = () => {
    const elemento = { id: subTasks.current.length + 1, name: task, state: 0 };

    if (task !== "") {
      setState((list) => {
        // crea la lista de sub tareas, mirando en que estado se encuantran. Agrega la sub-tarea creada.
        subTasks.current = list[0].items.concat(
          list[1].items,
          list[2].items,
          list[3].items,
          elemento
        );
        list = [
          {
            // estado 1
            title: "Por hacer",
            items: [],
          },
          {
            // estado 2
            title: "En progreso",
            items: [],
          },
          {
            // estado 3
            title: "En pruebas",
            items: [],
          },
          {
            // estado 4
            title: "Hecho",
            items: [],
          },
        ];

        // Coloca las sub-tareas en el estado correspondiente.
        subTasks.current.forEach((elemento) => {
          switch (elemento.state) {
            case 0:
              list[0].items = [...list[0].items, elemento];
              break;
            case 1:
              list[1].items = [...list[1].items, elemento];
              break;
            case 2:
              list[2].items = [...list[2].items, elemento];
              break;
            case 3:
              list[3].items = [...list[3].items, elemento];
              break;

            default:
              break;
          }
        });
        setStateCreate(!stateCreate);
        setTask("");
        return list;
      });
    }
  };

  const agregarSubTask = () => {
    setStateCreate(!stateCreate);
  };

  return (
    <div>
      <div className="modal-header">
        <h5 className="modal-title font-weight-bold text-light">{title}</h5>
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
              {_.map(state, (data, key) => {
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
