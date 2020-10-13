import React from "react";
import Tailwindcss from "./Tailwindcss";

function Code(props) {
  function renderCode(activeFramework) {
    switch (activeFramework) {
      case "tailwind":
        return <Tailwindcss palette={props.palette} />;
      case "bootstrap":
        return "bootstrap";
      default:
        return "nothing selected";
    }
  }
  return (
    <div
      id="code-area"
      className="w-1/6 h-full bg-gray-900 text-sm text-gray-100 p-2 rounded shadow overflow-y-scroll"
    >
      {renderCode(props.activeFramework)}
    </div>
  );
}

export default Code;
