import React, { useEffect, useState } from "react";

// components
import Palette from "./Palette";
import MenuBox from "./MenuBox";
import CodeBox from "./CodeBox";
import Header from "./Header";
import { useHistory, useLocation } from "react-router-dom";
import Sanitize from "../scripts/sanitizeColor";

// scripts
import { createPalette } from "../scripts/createPalette.js";

/**
 * Main component that displays the first page with form and palette
 * @param {object} props palette and onSubmit
 */
function Main(props) {
  /**
   * WHAT: color provided in the URL using react-router-dom
   * WHY: allow a user to provide a color upon starting the page
   */
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const colorParam = searchParams.get('color') ? searchParams.get('color') : '07c';
  /**
   * WHAT: enabling the history function from react-router-dom
   * WHY: allows the URL Parameter to be updated with the color
   */
  const history = useHistory();
  /**
   *WHAT: current color from color picker, or input field
   *WHY: we need it to create palette from. It's in Main so it can be passed to Palette
   */
  const [color, setColor] = useState(Sanitize(colorParam));

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
    history.replace({
      search: '?color=' + color.replace('#', '')
    })
    setColor(color);
    setPalette(createPalette(color));
  }

  return (
    <>
      <div
        className="font-mono text-gray-900 bg-white p-2 h-screen w-screen grid
                    grid-cols-12 grid-rows-8 gap-2"
      >
        <Header />
        <Palette palette={palette} />
        <MenuBox
          color={color}
          onColorChange={handleOnChange}
          activeFramework={activeFramework}
          setActiveFramework={setActiveFramework}
        />
        <CodeBox
          palette={palette}
          activeFramework={activeFramework}
        />
      </div>
    </>
  );
}

export default Main;
