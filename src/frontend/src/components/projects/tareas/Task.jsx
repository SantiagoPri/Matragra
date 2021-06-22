import React, { useRef, useState } from "react";
import { Fragment } from "react";
import { DragDrop } from "./DragDrop";
import { ModalContainerDetails } from "./ModalContainerDetails";
import { ModalContainerTask } from "./ModalContainerTask";
import { NewTask } from "./NewTask";
import { FaGripHorizontal, FaTrashAlt, FaFileMedical } from "react-icons/fa";

export const Task = () => {
  // lista de sub-tareas a mostrar en el modal.
  const listaSubTareas = useRef([]);
  const taskView = useRef(null); // tarea a mostrar en el modal.

  // Lista de Tareas.
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Tarea uno",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores repellendus molestiae exercitationem voluptatem tempora quo dolore nostrum dolor consequuntur",
    },
    {
      id: 2,
      name: "Tarea dos",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores repellendus molestiae exercitationem voluptatem tempora quo dolore nostrum dolor consequuntur",
    },
    {
      id: 3,
      name: "Tarea tres",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores repellendus molestiae exercitationem voluptatem tempora quo dolore nostrum dolor consequuntur",
    },
    {
      id: 4,
      name: "Tarea cuatro",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores repellendus molestiae exercitationem voluptatem tempora quo dolore nostrum dolor consequuntur",
    },
    {
      id: 5,
      name: "Tarea cinco",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores repellendus molestiae exercitationem voluptatem tempora quo dolore nostrum dolor consequuntur",
    },
  ]);

  /// datos temporales.
  const listaSubTareas1 = [
    { id: 1, name: "Tarea uno", state: 0 },
    { id: 2, name: "Tarea dos", state: 1 },
    { id: 3, name: "Tarea tres", state: 3 },
    { id: 4, name: "Tarea cuatro", state: 2 },
    { id: 5, name: "Tarea cuatro", state: 2 },
    { id: 6, name: "Tarea cuatro", state: 2 },
    { id: 7, name: "Tarea cuatro", state: 2 },
    { id: 8, name: "Tarea cuatro", state: 2 },
    { id: 9, name: "Tarea cuatro", state: 2 },
    { id: 10, name: "Tarea cuatro", state: 2 },
  ];
  const listaSubTareas2 = [
    { id: 1, name: "realizar uno", state: 1 },
    { id: 2, name: "realizar dos", state: 1 },
    { id: 3, name: "realizar tres", state: 2 },
    { id: 4, name: "realizar cuatro", state: 3 },
  ];
  const listaSubTareas3 = [
    { id: 1, name: "Trabajo uno", state: 0 },
    { id: 2, name: "Trabajo dos", state: 1 },
    { id: 3, name: "Trabajo tres", state: 2 },
    { id: 4, name: "Trabajo cuatro", state: 3 },
  ];
  const listaSubTareas4 = [
    { id: 1, name: "Tarea uno", state: 1 },
    { id: 2, name: "Tarea dos", state: 1 },
    { id: 3, name: "Tarea tres", state: 0 },
    { id: 4, name: "Tarea cuatro", state: 3 },
  ];
  const listaSubTareas5 = [
    { id: 1, name: "Tarea uno", state: 2 },
    { id: 2, name: "Tarea dos", state: 2 },
    { id: 3, name: "Tarea tres", state: 3 },
    { id: 4, name: "Tarea cuatro", state: 1 },
  ];

  // Modal
  const [isOpened, setIsOpened] = useState(false);
  const [isOpened2, setIsOpened2] = useState(false);
  // Abrir modal sub-tareas.
  const openModal = () => {
    setIsOpened(true);
  };
  // Cerrar modal sub-tareas.
  const closeModal = () => {
    setIsOpened(false);
  };
  // Abrir modal Crear nueva tarea.
  const openModalCreateTask = (taskV) => {
    taskView.current = taskV;
    setIsOpened2(true);
  };
  // Cerrar modal Crear nueva tarea.
  const closeModalCreateTask = () => {
    setIsOpened2(false);
  };

  // cargar las sub-tareas de la tarea seleccionada, para mostrarlas en el modal.
  const CambiarEstado = (id) => {
    switch (id) {
      case 1:
        listaSubTareas.current = listaSubTareas1;
        break;
      case 2:
        listaSubTareas.current = listaSubTareas2;
        break;
      case 3:
        listaSubTareas.current = listaSubTareas3;
        break;
      case 4:
        listaSubTareas.current = listaSubTareas4;
        break;
      case 5:
        listaSubTareas.current = listaSubTareas5;
        break;
      default:
        break;
    }
    openModal();
  };

  // Elimina una tarea de la lista de tareas.
  const deleteTask = (id) => {
    setTasks((list) => {
      list = [...list];

      const elem = list.find((element) => element.id === id);
      list.splice(list.indexOf(elem), 1);

      return list;
    });
  };

  return (
    <Fragment>
      <div className="" style={{ backgroundColor: "#282c34" }}>
        <div className="card" style={{ backgroundColor: "#282c34" }}>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table header-border  text-white">
                <thead>
                  <tr>
                    <th className="text-left">
                      <h5>Tareas</h5>
                    </th>
                    <th></th>
                    <th style={{ padding: 0, verticalAlign: "middle" }}>
                      <div
                        className="text-center icono-task"
                        onClick={() => openModalCreateTask(null)}
                      >
                        <FaFileMedical></FaFileMedical>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.length > 0 ? (
                    tasks.map((item, index) => {
                      return (
                        <Fragment key={index}>
                          <tr>
                            <td
                              className="col-6 text-left select-text line-td"
                              onClick={() => openModalCreateTask(item)}
                            >
                              {item.name}
                            </td>
                            <td
                              id={"boton" + item.id}
                              className="col-1 line-td"
                              style={{ padding: 0, verticalAlign: "middle" }}
                            >
                              <div
                                className="text-center icono-task"
                                onClick={() => CambiarEstado(item.id)}
                              >
                                <FaGripHorizontal></FaGripHorizontal>
                              </div>
                            </td>
                            <td
                              className="col-1 line-td"
                              style={{ padding: 0, verticalAlign: "middle" }}
                            >
                              <div
                                className="text-center icono-delete"
                                onClick={() => deleteTask(item.id)}
                              >
                                <FaTrashAlt></FaTrashAlt>
                              </div>
                            </td>
                          </tr>
                        </Fragment>
                      );
                    })
                  ) : (
                    <Fragment>
                      <div className="mt-3 text-left font-weight-bold">
                        No hay tareas...
                      </div>
                    </Fragment>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <ModalContainerTask isOpened={isOpened}>
        <DragDrop
          title="Titulo del Modal"
          onClose={closeModal}
          subTasks={listaSubTareas}
        ></DragDrop>
      </ModalContainerTask>

      <ModalContainerDetails
        title="Crear nueva tarea"
        isOpened={isOpened2}
        onClose={closeModalCreateTask}
      >
        <NewTask viewTask={taskView}></NewTask>
      </ModalContainerDetails>
    </Fragment>
  );
};
