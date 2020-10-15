import React from "react";

// scripts
import generateTailwind from "../scripts/generateTailwind";
import generateBootstrap from "../scripts/generateBootstrap";

// packages
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import scss from "react-syntax-highlighter/dist/esm/languages/hljs/scss";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyToClipboard } from "react-copy-to-clipboard";

/**
 * Actual code of chosen framework. All the frameworks will render here because we
 * want to use syntax highlighter in one place.
 * @param {*} props
 */
function CodeContent(props) {
  SyntaxHighlighter.registerLanguage("javascript", js);
  SyntaxHighlighter.registerLanguage("scss", scss);

  const tailwindCode = (
    <>
      <CopyToClipboard text={generateTailwind(props.palette)}>
        <div className="flex justify-end">
          <span className="cursor-pointer font-mono bg-teal-300 rounded text-teal-900 px-1 hover:bg-teal-900 hover:text-teal-300 transition duration-100">
            Copy
          </span>
        </div>
      </CopyToClipboard>
      <SyntaxHighlighter language="javascript" style={tomorrowNight}>
        {generateTailwind(props.palette)}
      </SyntaxHighlighter>
    </>
  );

  const bootstrapCode = (
    <>
      <CopyToClipboard text={generateBootstrap(props.palette)}>
        <div className="flex justify-end">
          <span className="cursor-pointer font-mono bg-purple-300 rounded text-purple-900 px-1 hover:bg-purple-900 hover:text-purple-300 transition duration-100">
            Copy
          </span>
        </div>
      </CopyToClipboard>
      <SyntaxHighlighter language="scss" style={tomorrowNight}>
        {generateBootstrap(props.palette)}
      </SyntaxHighlighter>
    </>
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
