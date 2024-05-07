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
import { Framework } from "../core/domain";
import { useAppSelector } from "@/hooks/useAppSelector";
import CopyCodeButton from "./CopyCodeButton";

/**
 * Actual code of chosen framework. All the frameworks will render here because we
 * want to use syntax highlighter in one place.
 *
 */
function CodeContent() {
  const activeFramework = useAppSelector(
    state => state.framework.activeFramework
  );

  const configurationCode = useAppSelector(
    state => state.framework.configurationCode
  );

  /* ------------------------------ Code handle ----------------------------- */

  /**
   * This part of code applies syntax highlighting and copy button
   */

  SyntaxHighlighter.registerLanguage("javascript", js);
  SyntaxHighlighter.registerLanguage("scss", scss);
  SyntaxHighlighter.registerLanguage("css", css);

  const tailwindCode = (
    <>
      <SyntaxHighlighter language="javascript" style={tomorrowNight}>
        {configurationCode}
      </SyntaxHighlighter>
    </>
  );

  const bootstrapCode = (
    <>
      <SyntaxHighlighter language="scss" style={tomorrowNight}>
        {configurationCode}
      </SyntaxHighlighter>
    </>
  );

  const cssCode = (
    <>
      <SyntaxHighlighter language="css" style={tomorrowNight}>
        {configurationCode}
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

  return (
    <>
      <CopyCodeButton />
      {renderCode(activeFramework)}
    </>
  );
}

export default CodeContent;
