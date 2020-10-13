import React, { useState } from "react";
import Header from "./Header";
import { HexColorPicker, HexColorInput } from "react-colorful";
import "react-colorful/dist/index.css";
import FrameworkList from "./FrameworkList";

function Menu(props) {
  return (
    <div className="w-1/6 h-full">
      <Header />
      <HexColorPicker
        color={props.color}
        onChange={props.onColorChange}
      />
      <HexColorInput
        placeholder={"HEX code"}
        color={props.color}
        onChange={props.onColorChange}
        className="bg-gray-200 rounded p-2 border "
      />
      <FrameworkList
        activeFramework={props.activeFramework}
        setActiveFramework={props.setActiveFramework}
      />
    </div>
  );
}

export default Menu;
