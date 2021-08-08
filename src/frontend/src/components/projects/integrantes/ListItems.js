import React, { Fragment, useContext, useState } from "react";
import { useQuery } from "react-query";
import { ApiContext } from "../../../contexts/ApiContext";
import { ImUserPlus, ImUserMinus } from "react-icons/im";
import { IconoAdjust, TextAdjust } from "../styled";
import { ModalIntegrante } from "./ModalIntegrantes";

const ListItems = (props) => {
  const { projectName } = props;
  const { apiCalls } = useContext(ApiContext);

  // Lista de items.
  const [items, setItems] = useState([]);

  const [isOpened, setIsOpened] = useState(false);

  const openModal = () => {
    setIsOpened(true);
  };

  const closeModal = () => {
    setIsOpened(false);
  };

  useQuery(
    ["getProjectMemebers", { projectName }],
    apiCalls.getMembersByProject,
    {
      onSuccess: (data) => {
        setItems(data);
      },
    }
  );

  return (
    <Fragment>
      <div>
        <div className="card bg-dark">
          <div className="card-header card-title text-light font-weight-bold">
            <div className="row">
              <TextAdjust className="col-xs-10 col-sm-10 col-md-10 col-lg-10 mt-1 text-center">
                Integrantes
              </TextAdjust>
              <IconoAdjust
                className="col-xs-2 col-sm-2 col-md-2 col-lg-2 icono-event"
                onClick={openModal}
              >
                <ImUserPlus></ImUserPlus>
              </IconoAdjust>
            </div>
          </div>

          <div className="card-body">
            <ul className="list-group ">
              {items.map((item) => {
                return (
                  <li key={item} className="nav-link text-light">
                    <div className="row">
                      <TextAdjust className="col-xs-10 col-sm-10 col-md-10 col-lg-10 text-left">
                        {item}
                      </TextAdjust>
                      <IconoAdjust
                        className="col-xs-2 col-sm-2 col-md-2 col-lg-2 icono-event text-right"
                        style={{ width: "32px" }}
                      >
                        <ImUserMinus></ImUserMinus>
                      </IconoAdjust>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <Fragment>
        <ModalIntegrante
          title="Nuevo"
          isOpened={isOpened}
          onClose={closeModal}
        ></ModalIntegrante>
      </Fragment>
    </Fragment>
  );
};

export default ListItems;
