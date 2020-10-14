import React from "react";
import generateTailwind from "../scripts/generateTailwind";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";

/**
 * Actual code of chosen framework. All the frameworks will render here because we
 * want to use syntax highlighter in one place.
 * @param {*} props
 */
function CodeContent(props) {
  SyntaxHighlighter.registerLanguage("javascript", js);

  const tailwindCode = (
    <SyntaxHighlighter language="javascript" style={tomorrowNight}>
      {generateTailwind(props.palette)}
    </SyntaxHighlighter>
  );

  function renderCode(activeFramework) {
    switch (activeFramework) {
      case "tailwind":
        return tailwindCode;
      case "bootstrap":
        return "bootstrap";
      default:
        return "nothing selected";
    }
  }

  return <>{renderCode(props.activeFramework)}</>;
}

export default CodeContent;
