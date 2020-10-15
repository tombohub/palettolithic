import React, { useState } from "react";

// components
import FrameworkItem from "./FrameworkItem";

/**
 * WHAT: list of frameworks to choose from.
 * The code will display based on active framework
 * @param {*} props
 */
function FrameworkList(props) {
  return (
    <ul className="pt-12">
      <FrameworkItem
        framework="tailwind"
        activeFramework={props.activeFramework}
        setActiveFramework={props.setActiveFramework}
      />
      <FrameworkItem
        framework="bootstrap"
        activeFramework={props.activeFramework}
        setActiveFramework={props.setActiveFramework}
      />
    </ul>
  );
}

export default FrameworkList;