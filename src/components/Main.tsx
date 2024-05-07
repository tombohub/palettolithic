import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useAppSelector.js";

// components
import Palette from "./Palette";
import MenuBox from "./MenuBox";
import ConfigurationCodeBox from "./ConfigurationCodeBox.js";
import Header from "./Header";
import { useSearchParams } from "react-router-dom";
import sanitize from "../scripts/sanitizeColor";

// scripts
import { createPalette } from "../core/palette.js";
import { ColorScale, Framework } from "../core/domain.js";

/**
 * Main component that displays the first page with form and palette
 */
function Main() {
  /**
   * WHAT: color provided in the URL using react-router-dom
   * WHY: allow a user to provide a color upon starting the page
   */
  const [searchParams, setSearchParams] = useSearchParams();
  const colorParam = searchParams.get("color") ?? "07c";

  /**
   *WHAT: current color  hex value from color picker, or input field
   *WHY: we need it to create palette from. It's in Main so it can be passed to Palette
   */
  const [hexValue, setHexValue] = useState(sanitize(colorParam));

  /**
   * Palette is the collection of shades for each color. Curently 12 colors with 10 shades each.
   * createPalette function is used to create a collection after form submit
   */
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
          hexValue={hexValue}
          activeFramework={activeFramework}
          onFrameworkChange={setActiveFramework}
        />
        <ConfigurationCodeBox palette={palette} />
      </div>
    </>
  );
}

export default Main;
