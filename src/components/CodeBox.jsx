import React from "react";

// components
import CodeContent from "./CodeContent";

//packages
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";

/**
 * Box in which we will render the code of chosen framework
 * @param {*} props
 */
function CodeBox(props) {
  return (
    <div
      id="code-area"
      className="col-span-2 row-span-7 bg-gray-900 text-sm text-gray-100 p-2 rounded shadow"
    >
      <PerfectScrollbar>
        <CodeContent
          activeFramework={props.activeFramework}
          palette={props.palette}
        />
      </PerfectScrollbar>
    </div>
  );
}

export default CodeBox;
