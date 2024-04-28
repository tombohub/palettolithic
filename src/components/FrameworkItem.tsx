import { Framework } from "../core/domain";

interface Props {
  framework: Framework;
  activeFramework: Framework;
  /**
   * Change of selected framework event
   */
  onFrameworkChange: (framework: Framework) => void;
}

/**
 * WHAT: Menu Item in framework menu. Parent is FrameworkList
 * WHY: There's more than one framework user can chose so it deserves component
 */
function FrameworkItem(props: Props) {
  /**
   * WHAT: get pseudo classes for hover: and active: states depends on the framework item
   * WHY: to get different menu item colors for tailwind, for bootstrap etc
   * @param {string} framework framework which this item represents
   * @param {string} activeFramework currently active framework
   * @returns {string} pseudo classes
   */
  const pseudoClasses = (framework: Framework, activeFramework: Framework) => {
    interface Classes {
      active: string;
      nonActive: string;
    }
    //
    // color objects item classes
    const tailwind: Classes = {
      active: "bg-teal-400 border-teal-400 rounded",
      nonActive:
        "hover:bg-teal-400 hover:rounded border-teal-400 transition duration-200",
    };

    // bootstrap item classes
    const bootstrap: Classes = {
      active: "bg-purple-400 border-purple-400 rounded ",
      nonActive:
        "hover:bg-purple-400 hover:rounded border-purple-400 transition duration-200",
    };

    // css variables item classes
    const cssVariables: Classes = {
      active: "bg-orange-400 border-orange-400 rounded ",
      nonActive:
        "hover:bg-orange-400 hover:rounded border-orange-400 transition duration-200",
    };

    const classes = (classes: Classes) => {
      if (activeFramework === framework) {
        return classes.active;
      } else {
        return classes.nonActive;
      }
    };

    switch (framework) {
      case "tailwind":
        return classes(tailwind);
      case "bootstrap 4":
        return classes(bootstrap);
      case "css":
        return classes(cssVariables);
      default:
        return "";
    }
  };

  return (
    <li
      className={`cursor-pointer p-2 capitalize text-lg mt-2 border-l-4
      ${pseudoClasses(props.framework, props.activeFramework)}
      `}
      onClick={() => props.onFrameworkChange(props.framework)}
    >
      {props.framework}
    </li>
  );
}

export default FrameworkItem;
