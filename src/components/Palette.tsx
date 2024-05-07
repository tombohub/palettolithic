import React from "react";
import Color from "./Color";
import { ColorScale } from "../core/domain";
import { getColorShadesHexValues } from "../core/palette";

interface Props {
  palette: ColorScale[];
}

/**
 * Hold the complete Palette. Which consists of Colors, inside Colors are Shades
 */
function Palette(props: Props) {
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
        {props.palette.map(colorScale => (
          <Color
            key={colorScale.colorName}
            shades={getColorShadesHexValues(colorScale)}
            color={colorScale.colorName}
          />
        ))}
      </div>
    </div>
  );
}

export default Palette;
