import { useState } from "react";
import { useAppSelector } from "@/hooks/useAppSelector.js";

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
  const palette = useAppSelector(state => state.palette.palette);

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
        <Palette palette={palette} />
        <MenuBox
          activeFramework={activeFramework}
          onFrameworkChange={setActiveFramework}
        />
        <ConfigurationCodeBox palette={palette} />
      </div>
    </>
  );
}

export default Main;
