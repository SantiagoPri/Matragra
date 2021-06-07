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
      <div class="col-xs-6 col-sm-6 col-md-4 col-lg-4">
        <div class="card" style={{ backgroundColor: "transparent" }}>
          <div class="card-body">
            <ul class="list-group ">
              {items.map((item) => {
                return <li class="nav-link text-light">{item}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ListItems;
