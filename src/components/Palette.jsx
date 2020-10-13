import React from "react";
import Color from "./Color";
import DownloadBox from "./DownloadBox";

/**
 * Hold the complete Palette. Which consists of Colors, inside Colors are Shades
 */
function Palette(props) {
  // get the list of colors from palette
  const colors = Object.keys(props.palette);

  // render the list of Color components based on colors.map and
  // pass the shades as props to the Color component, which it will use it to render
  // list of Shade component
  return (
    <div
      id="palette-outer"
      className="col-span-8 row-span-8 flex-auto bg-white rounded p-1 pl-2"
    >
      <div
        id="palette-inner"
        className="flex flex-col justify-between h-full rounded overflow-hidden"
      >
        {colors.map((color, i) => (
          <Color
            key={i}
            shades={props.palette[color]}
            color={color}
          />
        ))}
      </div>
    </div>
  );
}

export default Palette;
