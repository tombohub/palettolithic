import React from "react";
import Color from "./Color";

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
    <div className="mt-5 flex flex-col items-center">
      {colors.map((color, i) => (
        <>
          <h3 className="text-lg text-gray-800 font-bold">
            {color.toUpperCase()}
          </h3>
          <Color
            key={i}
            shades={props.palette[color]}
            color={color}
          />
        </>
      ))}
    </div>
  );
}

export default Palette;
