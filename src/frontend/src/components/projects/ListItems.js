import React, { Fragment, useContext, useState } from "react";
import { useQuery } from "react-query";
import { ApiContext } from "../../contexts/ApiContext";
import { ImUserPlus, ImUserMinus } from "react-icons/im";

const ListItems = (props) => {
  const { projectName } = props;
  const { apiCalls } = useContext(ApiContext);

  // Lista de items.
  const [items, setItems] = useState([]);

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
              <div
                className="col-xs-2 col-sm-2 col-md-2 col-lg-2 icono-event"
                style={{ width: "32px" }}
              >
                <ImUserMinus />
              </div>
              <div
                className="col-xs-8 col-sm-8 col-md-8 col-lg-8 mt-1"
                style={{ width: "116px" }}
              >
                Integrantes
              </div>

              <div
                className="col-xs-2 col-sm-2 col-md-2 col-lg-2 icono-event"
                style={{ width: "32px" }}
              >
                <ImUserPlus />
              </div>
            </div>
          </div>

          <div className="card-body">
            <ul className="list-group ">
              {items.map((item) => {
                return (
                  <li key={item} className="nav-link text-light">
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ListItems;
