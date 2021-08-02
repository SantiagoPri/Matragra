import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import Editor from "rich-markdown-editor";
import "./Style.css";

export const Answer = ({ title, listAnswers }) => {
  // Lista de respuestas.
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (listAnswers !== undefined) {
      setAnswers(listAnswers);
    }
  }, []);

  const [text, setText] = useState(`#### Respuesta`);
  const [isEdit, setIsEdit] = useState(false);

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
                defaultValue={text}
                onChange={(value) => setText(value)}
                readOnly={isEdit}
              />
              <div className="row">
                <div className="col">
                  <span className="autor">Autor: {answer.author}</span>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                  <button
                    type="button"
                    className="btn btn-rounded btn-secondary mt-3 col-xs-12 col-sm-10 col-md-9 col-lg-9"
                    style={{ backgroundColor: "#4f4fc3" }}
                  >
                    Publicar
                  </button>
                </div>
              </div>

              <hr style={{ backgroundColor: "#545b62" }}></hr>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};
