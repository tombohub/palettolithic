import React from "react";
import ColorScaleRow from "./ColorScaleRow";
import { getColorShadesHexValues } from "../core/palette";
import { useAppSelector } from "@/hooks/useAppSelector";

/**
 * Hold the complete Palette. Which consists of Colors, inside Colors are Shades
 */
function Palette() {
  const palette = useAppSelector(state => state.palette.currentPalette);

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
        {palette.map(colorScale => (
          <ColorScaleRow
            key={colorScale.colorName}
            shades={getColorShadesHexValues(colorScale)}
            colorName={colorScale.colorName}
          />
        ))}
      </div>
    </div>
  );
}

export default Palette;
