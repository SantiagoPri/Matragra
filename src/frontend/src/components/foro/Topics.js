import React, { Fragment, useState, useEffect } from "react";
import { FaPlus, FaList } from "react-icons/fa";
import "./Style.css";

export const Topics = ({ listTopics, isOpened }) => {
  // Lista de Topicos.
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    if (listTopics !== undefined) {
      setTopics(listTopics);
    }
  }, []);

  return (
    <Fragment>
      <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3 navbar-expand-sm">
        <label className="icono-menu">
          <input type="checkbox" id="btn-menu" />
          <FaList></FaList>
        </label>
        <div className="nk-sidebar">
          <div className="row">
            <div className="col">
              <h5 className="text-center text-white font-weight-bold">
                Topicos
              </h5>
            </div>
            <div className="col-2" onClick={() => isOpened()}>
              <FaPlus className="icono-topics"></FaPlus>
            </div>
          </div>
          <nav className="nav-scroll">
            <ul className="nk-sidebar-ul">
              {topics.map((topic, index) => {
                return (
                  <li key={index} className="nk-sidebar-li">
                    <a className="nk-sidebar-title nk-sidebar-item">
                      <span className="nav-text">{topic.title}</span>
                    </a>
                    <ul>
                      {topic.items.map((item, index) => {
                        return (
                          <li key={index} className="nk-sidebar-li-item">
                            <a
                              className="nk-sidebar-item"
                              href="./layout-blank.html"
                            >
                              {item}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </Fragment>
  );
};
