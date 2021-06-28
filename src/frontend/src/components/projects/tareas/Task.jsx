import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  Fragment,
} from "react";
import { DragDrop } from "./DragDrop";
import { ModalContainerDetails } from "./ModalContainerDetails";
import { ModalContainerTask } from "./ModalContainerTask";
import { NewTask } from "./NewTask";
import { FaGripHorizontal, FaTrashAlt, FaFileMedical } from "react-icons/fa";
import { ProjectContext } from "../../../contexts/ProjectContext";

export const Task = () => {
  const { visibleIndex, visiblePhase, deletePhase } =
    useContext(ProjectContext);

  useEffect(() => {
    let tasks = [];
    Object.entries(visiblePhase).forEach((object) => {
      const [taskName, task] = object;
      tasks.push({
        id: taskName,
        name: task.name,
        description: task.description,
      });
    });
    setTasks(tasks);
  }, [visiblePhase]);
  // lista de sub-tareas a mostrar en el modal.
  const [stateTitles, setStateTitles] = useState([]);
  const modalTitle = useRef("");
  const taskView = useRef(null); // tarea a mostrar en el modal.

  // Lista de Tareas.
  const [tasks, setTasks] = useState([]);

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
    const title = visiblePhase[id].name ? visiblePhase[id].name : "";
    modalTitle.current = title;
    setStateTitles(getTitles(visibleIndex));
    openModal();
  };

  // Elimina una tarea de la lista de tareas.
  const deleteTask = (id) => {
    deletePhase(id);
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
                      <PhaseName visibleIndex={visibleIndex} />
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
                      <tr>
                        <td>
                          <div className="mt-3 text-left font-weight-bold">
                            No hay tareas...
                          </div>
                        </td>
                      </tr>
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
          modalTitle={modalTitle}
          onClose={closeModal}
          stateTitles={stateTitles}
        ></DragDrop>
      </ModalContainerTask>

      <ModalContainerDetails
        title="Crear nueva tarea"
        isOpened={isOpened2}
        onClose={closeModalCreateTask}
      >
        <NewTask viewTask={taskView} onClose={closeModalCreateTask}></NewTask>
      </ModalContainerDetails>
    </Fragment>
  );
};

export default PhaseName;

function PhaseName(props) {
  switch (props.visibleIndex) {
    case 1:
      return <h5>Fase De Diseño</h5>;
    case 2:
      return <h5>Fase De Desarrollo</h5>;
    case 3:
      return <h5>Fase De Integración</h5>;
    default:
      return <Fragment />;
    //return <Redirect to="/main" />;
  }
}

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
