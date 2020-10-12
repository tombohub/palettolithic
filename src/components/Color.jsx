import React from "react";
import Shade from "./Shade";

/**
 * Hold Shades of single Color. It lists all the Shades of the Color passed in props from
 * Pallete component.
 * @param {object} props passed from App->Palette. Single color
 */
function Color(props) {
  if (!Array.isArray(props.shades)) return false;
  return (
    <div className="flex-1 rounded" data-name="color-outer">
      <div
        className="grid grid-cols-10 h-full rounded"
        data-name="color-inner"
      >
        <span className="my-auto">{props.color.toUpperCase()}</span>
        {props.shades.map((shade, i) => (
          <Shade key={i} shade={shade} />
        ))}
      </div>
    </div>
  );
}

export default Color;
