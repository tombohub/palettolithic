import React, { useEffect, useState } from "react";
import { createPalette } from "../scripts/createPalette";

import Palette from "./Palette";
import Menu from "./Menu";
import CodeBox from "./CodeBox";
import Header from "./Header";

/**
 * Main component that displays the first page with form and palette
 * @param {object} props palette and onSubmit
 */
function Main(props) {
  /**
   *WHAT: current color from color picker, or input field
   *WHY: we need it to create palette from. It's in Main so it can be passed to Palette
   */
  const [color, setColor] = useState("#07c");

  /**
   * Palette is the collection of shades for each color. Curently 12 colors with 10 shades each.
   * {color:[shades],....}. createPalette function is used to create a collection after form submit
   */
  const [palette, setPalette] = useState({});

  /**
   * WHAT: framework selected in the menu
   * WHY: code will be displayed in CodeBox based on active framework
   */
  const [activeFramework, setActiveFramework] = useState("tailwind");

  /**
   * WHAT: renders the initial demo pallete on first page visit
   * WHY: so user can immediately see an example
   */
  useEffect(() => {
    const initialPallete = createPalette(color);
    setPalette(initialPallete);
  }, [color]);

  /**
   * WHAT: handles the onChange of color picker.
   * WHY: theres no e.target.value because color pickier component passes color immediately
   * @param {string} color color hex code
   */
  function handleOnChange(color) {
    setColor(color);
    setPalette(createPalette(color));
  }

  return (
    <>
      <div className="text-gray-900 bg-white p-4 h-screen w-screen grid grid-cols-12 grid-rows-8 gap-2">
        <Header />
        <Palette palette={palette} />
        <Menu
          color={color}
          onColorChange={handleOnChange}
          activeFramework={activeFramework}
          setActiveFramework={setActiveFramework}
        />
        <CodeBox
          palette={palette}
          activeFramework={activeFramework}
        />

        {/* passing onSubmit from App to Form */}
        {/* <Form onSubmit={props.onSubmit} /> */}
      </div>
    </>
  );
}

export default Main;
