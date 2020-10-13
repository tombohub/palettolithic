import React, { useState } from "react";

/**
 * WHAT: Item in framework menu. Parent is FrameworkList
 * WHY: There's more than one framework user can chose so it deserves component
 * @param {*} props
 */
function FrameworkItem(props) {
  return (
    <li
      className={`cursor-pointer p-2 capitalize text-lg hover:underline ${
        props.activeFramework === props.framework
          ? "text-gray-100 bg-gray-700 rounded"
          : ""
      }`}
      onClick={() => props.setActiveFramework(props.framework)}
    >
      {props.framework}
    </li>
  );
}

export default FrameworkItem;
