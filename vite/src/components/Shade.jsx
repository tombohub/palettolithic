import React from "react";

function Shade(props) {
  return (
    <div
      data-name="shade"
      className=""
      style={{ backgroundColor: props.shade }}
    ></div>
  );
}

export default Shade;
