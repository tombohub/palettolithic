import { tail } from "lodash";
import React, { useState } from "react";

/**
 * WHAT: Menu Item in framework menu. Parent is FrameworkList
 * WHY: There's more than one framework user can chose so it deserves component
 * @param {*} props
 */
function FrameworkItem(props) {
  /**
   * WHAT: get pseudo classes for hover: and active: states depends on the framework item
   * WHY: to get different menu item colors for tailwind, for bootstrap etc
   * @param {string} framework framework which this item represents
   * @param {string} activeFramework currently active framework
   * @returns {string} pseudo classes
   */
  const pseudoClasses = (framework, activeFramework) => {
    //
    // tailwind item classes
    const tailwind = {
      active: "bg-teal-400 border-teal-400 rounded",
      nonActive:
        "hover:bg-teal-400 hover:rounded border-teal-400 transition duration-200",
    };

    // bootstrap item classes
    const bootstrap = {
      active: "bg-purple-400 border-purple-400 rounded ",
      nonActive:
        "hover:bg-purple-400 hover:rounded border-purple-400 transition duration-200",
    };

    // bootstrap item classes
    const css = {
      active: "bg-orange-400 border-orange-400 rounded ",
      nonActive:
        "hover:bg-orange-400 hover:rounded border-orange-400 transition duration-200",
    };

    const classes = classes => {
      if (activeFramework === framework) {
        return classes.active;
      } else {
        return classes.nonActive;
      }
    };

    switch (framework) {
      case "tailwind":
        return classes(tailwind);
      case "bootstrap":
        return classes(bootstrap);
      case "css":
        return classes(css);
      default:
        return "";
    }
  };

  return (
    <li
      className={`cursor-pointer p-2 capitalize text-lg mt-2 border-l-4
      ${pseudoClasses(props.framework, props.activeFramework)}
      `}
      onClick={() => props.setActiveFramework(props.framework)}
    >
      {props.framework}
    </li>
  );
}

export default FrameworkItem;
