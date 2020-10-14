import React from "react";
import generateTailwind from "../scripts/generateTailwind";
import generateBootstrap from "../scripts/generateBootstrap";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import scss from "react-syntax-highlighter/dist/esm/languages/hljs/scss";

import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";

/**
 * Actual code of chosen framework. All the frameworks will render here because we
 * want to use syntax highlighter in one place.
 * @param {*} props
 */
function CodeContent(props) {
  SyntaxHighlighter.registerLanguage("javascript", js);
  SyntaxHighlighter.registerLanguage("scss", scss);

  const tailwindCode = (
    <SyntaxHighlighter language="javascript" style={tomorrowNight}>
      {generateTailwind(props.palette)}
    </SyntaxHighlighter>
  );

  const bootstrapCode = (
    <SyntaxHighlighter language="scss" style={tomorrowNight}>
      {generateBootstrap(props.palette)}
    </SyntaxHighlighter>
  );

  function renderCode(activeFramework) {
    switch (activeFramework) {
      case "tailwind":
        return tailwindCode;
      case "bootstrap":
        return bootstrapCode;
      default:
        return "nothing selected";
    }
  }

  return <>{renderCode(props.activeFramework)}</>;
}

export default CodeContent;
