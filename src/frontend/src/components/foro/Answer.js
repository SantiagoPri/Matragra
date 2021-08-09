import React, { useContext, useState } from "react";
import { Fragment } from "react";
import Editor from "rich-markdown-editor";
import { ForumContext } from "../../contexts/ForoContext";
import { ProjectContext } from "../../contexts/ProjectContext";
import "./Style-forum.css";

export const Answer = ({ title }) => {
  const { answers, createAnswer, currentForoName, destroyAnswer } =
    useContext(ForumContext);
  const { name } = useContext(ProjectContext);

  const [text, setText] = useState("Escribe una respuesta");

  const handleClick = () => {
    if (text !== "Escribe una respuesta") {
      createAnswer({ name, currentForoName, answer: { description: text } });
    }
  };

  return (
    <Fragment>
      <hr style={{ backgroundColor: "#6699ff" }}></hr>
      <br></br>

      <div className="card card-respuesta mb-3">
        <div className="card-header text-white font-weight-bold">{title}</div>
        {answers.map((answer, index) => {
          return (
            <div key={index} className="card-body text-white">
              <Editor
                className="container-editor"
                defaultValue={answer.description}
                readOnly={true}
              />
              <div className="row">
                <div className="col">
                  <span className="autor">Autor: {answer.author}</span>
                </div>
              </div>

              <hr style={{ backgroundColor: "#545b62" }}></hr>
            </div>
          );
        })}
        <div className="card-body text-white">
          <div className="row">
            <div className="column">
              <Editor
                key={destroyAnswer}
                className="container-editor"
                placeholder={"Escribe una respuesta"}
                onChange={(value) => setText(value)}
                readOnly={false}
              />
            </div>
          </div>

          <hr style={{ backgroundColor: "#545b62" }}></hr>
        </div>
        <Fragment>
          <div className="fab-content">
            <div className="fab-container" onClick={handleClick}>
              <div className="fab fab-icon-holder">Publicar</div>
            </div>
          </div>
        </Fragment>
        <br />
      </div>
    </Fragment>
  );
};
