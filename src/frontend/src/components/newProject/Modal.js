import { Fragment, useState, useContext } from "react";
import { Lista, Boton } from "./styled";
import { GeneralContext } from "../../contexts/GeneralContext";

export const Modal = () => {
  const {
    listObjectives,
    setListObjectives,
    projectName,
    setProjectName,
    alcance,
    setAlcance,
  } = useContext(GeneralContext);
  const [btnAgregar, setBtnAgregar] = useState(false);
  const [objetive, setObjetive] = useState("");

  const ChangeStatus = (condition) => {
    setBtnAgregar(condition);
  };

  const addObjetive = () => {
    if (objetive) {
      let idTemp = 1;
      if (listObjectives.length >= 1) {
        idTemp = listObjectives[listObjectives.length - 1]?.id;
      }
      const newObjetive = {
        id: listObjectives.length !== null ? idTemp + 1 : 1,
        name: objetive,
      };

      setListObjectives([...listObjectives, newObjetive]);
      setObjetive("");
    }
  };

  return (
    <Fragment>
      <div className="form-group">
        <input
          type="text"
          className="form-control input-flat"
          placeholder="Nombre del proyecto"
          onChange={(text) => setProjectName(text.target.value)}
          value={projectName}
        ></input>
      </div>

      <div className="card" style={{ backgroundColor: "transparent" }}>
        <div className="card-body">
          {!btnAgregar ? (
            <div className="form-inline row">
              <div className="form-group mb-2">
                <label className="label font-weight-bold ml-3">
                  {" "}
                  Objetivos{" "}
                </label>
              </div>
              <Boton
                type="button"
                className="btn ml-auto"
                onClick={() => ChangeStatus(true)}
              >
                Agregar objetivo
              </Boton>
            </div>
          ) : (
            <Fragment>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Agregar objetivo"
                  onChange={(text) => setObjetive(text.target.value)}
                  value={objetive}
                ></input>
                <div className="input-group-append">
                  <Boton
                    className="btn btn-outline-dark"
                    type="button"
                    onClick={() => addObjetive()}
                  >
                    Agregar
                  </Boton>
                  <button
                    className="btn btn-outline-danger"
                    type="button"
                    onClick={() => ChangeStatus(false)}
                  >
                    Canelar
                  </button>
                </div>
              </div>
              <br></br>
            </Fragment>
          )}
          <Lista className="list-group">
            {listObjectives.map((item) => {
              return (
                <li key={item.id} className="nav-link">
                  {item.name}
                </li>
              );
            })}
          </Lista>
        </div>
      </div>
      <br></br>

      <div className="form-group">
        <input
          type="text"
          maxLength={250}
          className="form-control input-flat"
          placeholder="Alcance"
          onChange={(text) => setAlcance(text.target.value)}
          value={alcance}
        ></input>
      </div>
    </Fragment>
  );
};
