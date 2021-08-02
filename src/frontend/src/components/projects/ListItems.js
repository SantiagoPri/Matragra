import React, { Fragment, useContext, useState } from "react";
import { useQuery } from "react-query";
import { ApiContext } from "../../contexts/ApiContext";

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
      <div className="col-xs-6 col-sm-6 col-md-4 col-lg-4">
        <div className="card" style={{ backgroundColor: "transparent" }}>
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
