import { useAppSelector } from "@/hooks/useAppSelector";
import CopyCodeButton from "./CopyCodeButton";
import { CodeHighlight } from "@mantine/code-highlight";

/**
 * Actual code of chosen framework. All the frameworks will render here because we
 * want to use syntax highlighter in one place.
 *
 */
function CodeContent() {
  const configurationCode = useAppSelector(
    state => state.framework.configurationCode
  );

  return (
    <>
      <CopyCodeButton />
      <CodeHighlight code={configurationCode} language="javascript" />
    </>
  );
}

export default CodeContent;
