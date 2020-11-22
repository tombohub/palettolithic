import React, { useState } from "react";

// components
import FrameworkList from "./FrameworkList";

// packages
import { HexColorPicker, HexColorInput } from "react-colorful";
import "react-colorful/dist/index.css";

// custom css for color picker
import "./menu.css";

/**
 * WHAT: menu box to hold color picker and frameworks menu items
 * @param {*} props
 */
function MenuBox(props) {
  return (
    <div className="col-span-2 row-span-7">
      <HexColorPicker
        color={props.color}
        onChange={props.onColorChange}
      />
      <HexColorInput
        placeholder={"HEX code"}
        color={props.color}
        onChange={props.onColorChange}
        className="bg-gray-200 rounded p-2 border w-full "
      />
      <FrameworkList
        activeFramework={props.activeFramework}
        setActiveFramework={props.setActiveFramework}
      />
      <a href="https://github.com/tombohub/palettolithic">Github</a>
    </div>
  );
}

export default MenuBox;
