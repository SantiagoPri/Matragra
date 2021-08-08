import React from "react";

const ProgressBar = (props) => {
  const { color, porcentaje } = props;

  const containerStyles = {
    //   height: 20,
    width: "90%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    marginTop: 30,
    marginRight: "5%",
    marginLeft: "5%",
  };

  const StyleBar = {
    height: "100%",
    width: `${porcentaje}%`,
    backgroundColor: color,
    borderRadius: "inherit",
    textAlign: "center",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={StyleBar}>
        <span style={labelStyles}>{`${porcentaje}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
