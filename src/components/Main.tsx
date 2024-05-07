import { useState } from "react";

// components
import Palette from "./Palette";
import MenuBox from "./MenuBox";
import ConfigurationCodeBox from "./ConfigurationCodeBox.js";
import Header from "./Header";

// scripts
import { Framework } from "../core/domain.js";

/**
 * Main component that displays the first page with form and palette
 */
function Main() {
  /**
   * WHAT: framework selected in the menu
   * WHY: code will be displayed in CodeBox based on active framework
   */
  const [activeFramework, setActiveFramework] = useState<Framework>("tailwind");

  return (
    <>
      <div
        className="font-mono text-gray-900 bg-white p-2 h-screen w-screen grid
                    grid-cols-12 grid-rows-8 gap-2"
      >
        <Header />
        <Palette />
        <MenuBox
          activeFramework={activeFramework}
          onFrameworkChange={setActiveFramework}
        />
        <ConfigurationCodeBox />
      </div>
    </>
  );
}

export default Main;
