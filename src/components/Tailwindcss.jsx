import React from "react";
import { generateTailwindcss } from "../scripts/createPalette";
import stringifyObject from "stringify-object";

function Tailwindcss(props) {
  const tailwindcss = generateTailwindcss(props.palette);

  return (
    <pre>
      {JSON.stringify(tailwindcss, null, 2)
        .slice(1, -1)
        .trim()
        .replace(/"([^"]+)":/g, "$1:")}
    </pre>
  );
}

export default Tailwindcss;
