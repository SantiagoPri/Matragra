import React, { Fragment, useState, useEffect, useContext } from "react";
import { ForumContext } from "../../contexts/ForoContext";
import { FaPlus, FaList } from "react-icons/fa";
import "./Style-forum.css";
import { queryClient } from "../../App";

export const Topics = ({ isOpened }) => {
  const [formatedTopics, setFormatedTopics] = useState([]);

  const { topics, setCurrentForoName, setIsCreating } =
    useContext(ForumContext);

  useEffect(() => {
    const maptopics = {
      phase0: "Etapa 0",
      phase1: "Etapa 1",
      phase2: "Etapa 2",
      phase3: "Etapa 3",
      general: "General",
    };
    const topics1 = topics.map((topic) => {
      return { title: maptopics[topic.title], items: topic.items };
    });
    topics1.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      } else {
        return 1;
      }
    });
    setFormatedTopics(topics1);
  }, []);

  const handleClick = async (foroName) => {
    setCurrentForoName(foroName);
    setIsCreating(false);
    await queryClient.refetchQueries(["getForum"], {
      active: true,
    });
  };

  return (
    <Fragment>
      <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3 navbar-expand-sm">
        <label className="icono-menu">
          <input type="checkbox" id="btn-menu" />
          <FaList></FaList>
        </label>
        <div className="nk2-sidebar">
          <div className="row">
            <div className="col">
              <h5 className="text-center text-white font-weight-bold">Temas</h5>
            </div>
            <div className="col-2" onClick={() => isOpened()}>
              <FaPlus className="icono-topics"></FaPlus>
            </div>
          </div>
          <nav className="nav-scroll">
            <ul className="nk2-sidebar-ul">
              {formatedTopics.map((topic, index) => {
                return (
                  <li key={index} className="nk2-sidebar-li">
                    <div className="nk2-sidebar-title nk2-sidebar-item2">
                      <span className="nav-text">{topic.title}</span>
                    </div>
                    <ul>
                      {topic.items.map((item, index) => {
                        return (
                          <li
                            key={`${item}${index}`}
                            className="nk2-sidebar-li-item"
                          >
                            <a
                              className="nk2-sidebar-item"
                              onClick={() => handleClick(item)}
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
