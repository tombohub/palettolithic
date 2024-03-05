import React from "react";

// components
import CodeContent from "./CodeContent";

/**
 * Box in which we will render the code of chosen framework
 *
 */
function CodeBox(props) {
  return (
    <div
      id="code-area"
      className="col-span-2 row-span-7 bg-gray-900 text-sm text-gray-100 p-2 rounded overflow-auto"
    >
      <CodeContent
        activeFramework={props.activeFramework}
        palette={props.palette}
      />
    </div>
  );
}

export default CodeBox;
