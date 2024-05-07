declare global {
  interface Window {
    gtag: (
      type: string,
      event: string,
      options?: Record<string, unknown>
    ) => void;
  }
}

import { CopyButton, Button } from "@mantine/core";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useClipboard } from "@mantine/hooks";

export default function CopyCodeButton() {
  const clipboard = useClipboard();
  const configurationCode = useAppSelector(
    state => state.framework.configurationCode
  );

  function handleClick() {
    clipboard.copy(configurationCode);
    // google analytics event no copy button click
    window.gtag("event", "click-copy-button");
  }
  return (
    <>
      <Button color={clipboard.copied ? "green" : "blue"} onClick={handleClick}>
        {clipboard.copied ? "Copied" : "Copy"}
      </Button>
    </>
  );
}
