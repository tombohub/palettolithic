import React from "react";

function Shade(props) {
  return (
    <div className="p-8" style={{ backgroundColor: props.shade }}>
      {props.shade}
    </div>
  );
}

export default Shade;
