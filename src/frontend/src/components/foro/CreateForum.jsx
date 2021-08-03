import React, { useState, useContext, Fragment } from "react";

import { FaFileDownload, FaPlus } from "react-icons/fa";
import { Answer } from "./Answer";
import { FabOptionsAnswer } from "./FabOptionsAnswer";
import "./Style.css";
import "./StyleEditor.css";
import { Topics } from "./Topics";
import Editor from "rich-markdown-editor";
import { ModalContainerForum } from "./ModalContainerForum";
import { ApiContext } from "../../contexts/ApiContext";
import { ProjectContext } from "../../contexts/ProjectContext";
import { useQuery } from "react-query";

export const CreateForum = () => {
  const { apiCalls } = useContext(ApiContext);
  const { name } = useContext(ProjectContext);

  const [topics, setTopics] = useState([]);

  useQuery(["getForumList", { name }], apiCalls.getForoList, {
    onSuccess: (data) => {
      setTopics(data);
    },
  });

  const saveFile = async (fileList) => {
    const urlList = await Promise.all(
      Array.apply(null, Array(fileList.length)).map((file, index) => {
        return apiCalls.saveFile(fileList[index], name, "binary/octet-stream");
      })
    );
    // TODO: update urls
  };

  const [answers, setAnswers] = useState([
    {
      title: "Titulo",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aspernatur sequi iusto eos ratione, sint ab accusantium ipsa suscipit dolorum vel perspiciatis molestias dicta nam incidunt, deleniti quos? Enim, assumenda?",
      author: "Juan",
    },
    {
      title: "Titulo dos",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti aspernatur sequi iusto eos ratione, sint ab accusantium ipsa ",
      author: "Andres",
    },
    {
      title: "Titulo tres",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
      author: "Camilo",
    },
  ]);

  const [text, setText] = useState(`#### Texto`);
  const [isEdit, setIsEdit] = useState(false);

  // Modal
  const [isOpened, setIsOpened] = useState(false);
  // Abrir modal sub-tareas.
  const openModal = () => {
    setIsOpened(true);
  };
  // Cerrar modal sub-tareas.
  const closeModal = () => {
    setIsOpened(false);
  };

  // Seleccionar un archivo
  const openFile = (file) => {
    //
  };

  return (
    <Fragment>
      <div className="row" style={{ backgroundColor: "#282c34" }}>
        {/* Lista de topicos */}
        <Topics listTopics={topics} isOpened={() => openModal()}></Topics>

        <div className="col-xs-12 col-sm-12 col-md col-lg">
          <div className="card" style={{ backgroundColor: "transparent" }}>
            <div className="card-body">
              <h3 className="card-title text-white text-center">Title</h3>
              <Editor
                className="container-editor"
                defaultValue={text}
                onChange={(value) => setText(value)}
                readOnly={isEdit}
                uploadImage={async (file) => {
                  return await apiCalls.saveFile(file, name);
                }}
              />
              <div className="card" style={{ backgroundColor: "transparent" }}>
                <div className="card-body">
                  <div className="row">
                    <div className="ml-3 mr-3" style={{ width: "110" }}>
                      <h5>Archivos</h5>
                    </div>

                    <div className="container-input">
                      <input
                        type="file"
                        name="file-6"
                        style={{ display: "none" }}
                        id="file-6"
                        onChange={(e) => saveFile(e.target.files)}
                      />
                      <label htmlFor="file-6">
                        <figure>
                          <FaPlus className="icono-topics"></FaPlus>
                        </figure>
                      </label>
                    </div>

                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
                  </div>

                  <div className="row">
                    <div className="contenedor-icono-archivo">
                      <FaFileDownload className="icono-archivo"></FaFileDownload>
                      <div className="text-white text-center">Archivo </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col"></div>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                  <button
                    type="button"
                    className="btn btn-rounded btn-secondary col-xs-12 col-sm-10 col-md-9 col-lg-9"
                    style={{ backgroundColor: "#4f4fc3" }}
                  >
                    Publicar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Botones agragar (texto - imagenes- archivos) */}
          {/* <FabOptionsQuestion></FabOptionsQuestion> */}

          {/* Respuestas */}
          <Answer title="Respuestas" listAnswers={answers}></Answer>

          {/* Boton agragar (texto) respuesta*/}
          <FabOptionsAnswer></FabOptionsAnswer>
        </div>
        <ModalContainerForum
          title="Nuevo item"
          isOpened={isOpened}
          onClose={closeModal}
        ></ModalContainerForum>
      </div>
    </Fragment>
  );
};
