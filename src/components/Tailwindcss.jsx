import React from "react";
import { generateTailwindcss } from "../scripts/createPalette";

function Tailwindcss(props) {
  const tailwindcss = generateTailwindcss(props.palette);
  const ko = util.inspect(tailwindcss);

  return (
    <pre>
      {/* {JSON.stringify(tailwindcss, null, 2).slice(1, -1).trim()} */}
      {ko}
    </pre>
  );
}

export default Tailwindcss;
