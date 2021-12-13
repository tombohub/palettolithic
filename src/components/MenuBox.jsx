import React, { useState } from "react";

// components
import FrameworkList from "./FrameworkList";
import MenuBottom from "./MenuBottom";
import ColorPicker from "./ColorPicker";

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
    <>
      <div className="col-span-2 row-span-7">
        <ColorPicker color={props.color} onColorChange={props.onColorChange} />
        {/* <HexColorPicker color={props.color} onChange={props.onColorChange} />
        <HexColorInput
          placeholder={"HEX code"}
          color={props.color}
          onChange={props.onColorChange}
          className="bg-gray-200 rounded p-2 border w-full "
        /> */}
        <FrameworkList
          activeFramework={props.activeFramework}
          setActiveFramework={props.setActiveFramework}
        />

        <div className="mt-32">
          <MenuBottom />
        </div>
      </div>
    </>
  );
}

export default MenuBox;
