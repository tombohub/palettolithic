import React from "react";
import { generateTailwindcss } from "../scripts/createPalette";

function DownloadBox(props) {
  console.log("palette", props.palette);
  if (!props.palette) return "Loading";
  return props.palette.red;
}

export default DownloadBox;
