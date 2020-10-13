import React from "react";
import Tailwindcss from "./Tailwindcss";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

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
      className="col-span-2 row-span-7 bg-gray-900 text-sm text-gray-100 p-2 rounded shadow"
    >
      <PerfectScrollbar>
        {renderCode(props.activeFramework)}
      </PerfectScrollbar>
    </div>
  );
}

export default Code;
