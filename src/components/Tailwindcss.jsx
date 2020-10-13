import React from "react";
import { generateTailwindcss } from "../scripts/createPalette";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";

function Tailwindcss(props) {
  const tailwindcss = generateTailwindcss(props.palette);
  SyntaxHighlighter.registerLanguage("javascript", js);

  return (
    <>
      <SyntaxHighlighter language="javascript" style={tomorrowNight}>
        {JSON.stringify(tailwindcss, null, 2)
          .slice(1, -1)
          .trim()
          .replace(/"([^"]+)":/g, "$1:")}
      </SyntaxHighlighter>
    </>
  );
}

export default Tailwindcss;
