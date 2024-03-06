import React from "react";

// components
import FrameworkItem from "./FrameworkItem";
import { Framework, frameworks } from "../scripts/domain";

interface Props {
  activeFramework: Framework;
  /**
   * Change of selected framework event
   */
  onFrameworkChange: (framework: Framework) => void;
}

/**
 * WHAT: Menu list of frameworks to choose from.
 * The code will display based on active framework
 */
function FrameworkList(props: Props) {
  return (
    <ul className="pt-12">
      {frameworks.map(framework => (
        <FrameworkItem
          framework={framework}
          activeFramework={props.activeFramework}
          onFrameworkChange={props.onFrameworkChange}
          key={framework}
        />
      ))}
    </ul>
  );
}

export default FrameworkList;
