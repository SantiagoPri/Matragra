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
import { ForumContext } from "../../contexts/ForoContext";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";

export const CreateForum = () => {
  const historyHook = useHistory();
  const { apiCalls } = useContext(ApiContext);
  const { name } = useContext(ProjectContext);
  const {
    setTopics,
    handleModalChange,
    createForum,
    currentForoName,
    isCreating,
    newForo,
    currentForo,
    setCurrentForo,
    setAnswers,
  } = useContext(ForumContext);

  useQuery(["getForumList", { projectName: name }], apiCalls.getForoList, {
    onSuccess: (data) => {
      setTopics(data);
    },
  });

  const { data: forumData } = useQuery(
    ["getForum", { projectName: name, currentForoName }],
    apiCalls.mainTopic,
    {
      enabled: !isCreating,
      onSuccess: (data) => {
        if (!data) {
          return;
        }
        const { answers, ...foro } = data;
        setCurrentForo(foro);
        setAnswers(answers ? answers : []);
      },
    }
  );

  const saveFile = async (fileList) => {
    const urlList = await Promise.all(
      Array.apply(null, Array(fileList.length)).map((file, index) => {
        return apiCalls.saveFile(fileList[index], name, "binary/octet-stream");
      })
    );
    handleModalChange({
      target: [...newForo.files, ...urlList],
      name: "files",
    });
  };

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

  return (
    <Fragment>
      <div className="row" style={{ backgroundColor: "#282c34" }}>
        {/* Lista de topicos */}
        <Topics isOpened={() => openModal()}></Topics>

        {isCreating || forumData ? (
          <div className="col-xs-12 col-sm-12 col-md col-lg">
            <div className="card" style={{ backgroundColor: "transparent" }}>
              <div className="card-body">
                <h3 className="card-title text-white text-center">
                  {isCreating ? newForo.foroName : currentForo.foroName}
                </h3>
                <Editor
                  className="container-editor"
                  defaultValue={
                    isCreating ? newForo.description : currentForo.description
                  }
                  onChange={(value) =>
                    handleModalChange({
                      target: { value: value(), name: "description" },
                    })
                  }
                  readOnly={!isCreating}
                  uploadImage={async (file) => {
                    const fileUrl = await apiCalls.saveFile(file, name);
                    return fileUrl.url;
                  }}
                />
                <div
                  className="card"
                  style={{ backgroundColor: "transparent" }}
                >
                  <div className="card-body">
                    <div className="row">
                      <div className="ml-3 mr-3" style={{ width: "110" }}>
                        <h5>Archivos</h5>
                      </div>
                      {isCreating ? (
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
                      ) : null}
                      <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"></div>
                    </div>

                    <div className="row">
                      {isCreating
                        ? newForo.files.map((file) => {
                            formatFile(file, historyHook);
                          })
                        : currentForo.files.map((file) => {
                            formatFile(file, historyHook);
                          })}
                    </div>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col"></div>
                  <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                    {isCreating ? (
                      <button
                        type="button"
                        onClick={() => createForum(newForo)}
                        className="btn btn-rounded btn-secondary col-xs-12 col-sm-10 col-md-9 col-lg-9"
                        style={{ backgroundColor: "#4f4fc3" }}
                      >
                        Publicar
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* Respuestas */}
            {isCreating ? null : <Answer title="Respuestas"></Answer>}
          </div>
        ) : null}
        <ModalContainerForum
          isOpened={isOpened}
          onClose={closeModal}
        ></ModalContainerForum>
      </div>
    </Fragment>
  );
};

function formatFile(file, historyHook) {
  return (
    <div
      key={file.name}
      className="contenedor-icono-archivo"
      onClick={() => {
        historyHook.push(file.url);
      }}
    >
      <FaFileDownload className="icono-archivo"></FaFileDownload>
      <div className="text-white text-center">{file.name}</div>
    </div>
  );
}
