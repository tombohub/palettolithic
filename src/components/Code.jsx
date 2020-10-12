import React from "react";
import Tailwindcss from "./Tailwindcss";

function Code(props) {
  return (
    <div
      id="code-area"
      className="w-1/6 h-full bg-gray-900 text-gray-100 p-2 rounded shadow overflow-scroll"
    >
      <Tailwindcss palette={props.palette} />
    </div>
  );
}

export default Code;
