import React, { useState } from "react";
import Header from "./Header";
import { HexColorPicker, HexColorInput } from "react-colorful";
import "react-colorful/dist/index.css";

function Menu(props) {
  return (
    <div className="w-1/6 h-full">
      <Header />
      <HexColorPicker color={props.color} onChange={props.onChange} />
      <HexColorInput
        placeholder={"soks"}
        color={props.color}
        onChange={props.onChange}
        className="bg-gray-400"
      />
      Color picker<br></br>
      FrameworkList
    </div>
  );
}

export default Menu;
