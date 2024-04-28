declare global {
  interface Window {
    gtag: (
      type: string,
      event: string,
      options?: Record<string, unknown>
    ) => void;
  }
}
import { useEffect } from "react";
import { useState } from "react";

// scripts
import { generateTailwind } from "../scripts/generateTailwind";
import { generateBootstrap } from "../scripts/generateBootstrap";
import { generateCssVariables } from "../scripts/generateCssVariables";

// packages
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import scss from "react-syntax-highlighter/dist/esm/languages/hljs/scss";
import css from "react-syntax-highlighter/dist/esm/languages/hljs/css";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ColorScale, Framework } from "../core/domain";

interface Props {
  palette: ColorScale[];
  activeFramework: Framework;
}

/**
 * Actual code of chosen framework. All the frameworks will render here because we
 * want to use syntax highlighter in one place.
 *
 */
function CodeContent(props: Props) {
  //
  /**
   * WHAT: state if code is copied.
   * WHY: so the user gets feedback if code is copied to clipboard.
   * It uses useEffect to change back to 'Copy' anytime the palette or active framework changes.
   * When user clicks on "Copy" span button then the handleOnClick sets the state to "Copied"
   */
  const [copyStatus, setCopyStatus] = useState("Copy");

  useEffect(() => {
    setCopyStatus("Copy");
  }, [props.palette, props.activeFramework]);

  function handleOnClick() {
    setCopyStatus("Copied");

    // google analytics event no copy button click
    window.gtag("event", "click-copy-button");
  }

  /* ------------------------------ Code handle ----------------------------- */

  /**
   * This part of code applies syntax highlighting and copy button
   */

  SyntaxHighlighter.registerLanguage("javascript", js);
  SyntaxHighlighter.registerLanguage("scss", scss);
  SyntaxHighlighter.registerLanguage("css", css);

  const tailwindCode = (
    <>
      <CopyToClipboard text={generateTailwind(props.palette)}>
        <div className="flex justify-end">
          <span
            onClick={handleOnClick}
            className="cursor-pointer font-mono bg-teal-300 rounded text-teal-900 px-1 hover:bg-teal-900 hover:text-teal-300 transition duration-100"
          >
            {copyStatus}
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
          <span
            onClick={handleOnClick}
            className="cursor-pointer font-mono bg-purple-300 rounded text-purple-900 px-1 hover:bg-purple-900 hover:text-purple-300 transition duration-100"
          >
            {copyStatus}
          </span>
        </div>
      </CopyToClipboard>
      <SyntaxHighlighter language="scss" style={tomorrowNight}>
        {generateBootstrap(props.palette)}
      </SyntaxHighlighter>
    </>
  );

  const cssCode = (
    <>
      <CopyToClipboard text={generateCssVariables(props.palette)}>
        <div className="flex justify-end">
          <span
            onClick={handleOnClick}
            className="cursor-pointer font-mono bg-orange-300 rounded text-orange-900 px-1 hover:bg-orange-900 hover:text-orange-300 transition duration-100"
          >
            {copyStatus}
          </span>
        </div>
      </CopyToClipboard>
      <SyntaxHighlighter language="css" style={tomorrowNight}>
        {generateCssVariables(props.palette)}
      </SyntaxHighlighter>
    </>
  );

  /* -------------------------------- Render -------------------------------- */

  function renderCode(activeFramework: Framework) {
    switch (activeFramework) {
      case "tailwind":
        return tailwindCode;
      case "bootstrap 4":
        return bootstrapCode;
      case "css":
        return cssCode;
      default:
        return "nothing selected";
    }
  }

  return <>{renderCode(props.activeFramework)}</>;
}

export default CodeContent;
