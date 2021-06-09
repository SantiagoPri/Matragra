import React, { Fragment, useEffect, useState } from "react";

const ListItems = (props) => {
  const { listItems } = props;

  // Lista de items.
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (listItems !== undefined) {
      setItems(listItems);
    }
  }, []);

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
