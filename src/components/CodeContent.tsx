import { useAppSelector } from "@/ui/hooks/useAppSelector";
import CopyCodeButton from "./CopyCodeButton";
import { CodeHighlight } from "@mantine/code-highlight";
import { Box } from "@mantine/core";

/**
 * Actual code of chosen framework. All the frameworks will render here because we
 * want to use syntax highlighter in one place.
 *
 */
function CodeContent() {
  const configurationCode = useAppSelector(
    state => state.app.configurationCode
  );

  return (
    <>
      <Box bg={"dark"}>
        <CopyCodeButton />
        <CodeHighlight
          code={configurationCode}
          withCopyButton={false}
          bg={"dark"}
        />
      </Box>
    </>
  );
}

export default CodeContent;
