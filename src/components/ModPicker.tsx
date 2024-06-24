import { useElementSize, useMove } from "@mantine/hooks";
import { Box, Center, rem } from "@mantine/core";
import { useState } from "react";
import Draggable from "react-draggable";

/**
 * Similar to color picker. Pick modification factors for hue and saturation
 * with single picker
 */
export default function ModPicker() {
  // const { ref, width, height } = useElementSize();
  const [value, setValue] = useState({ x: 0.2, y: 0.6 });
  const { ref, active } = useMove(setValue);

  return (
    <>
      <Center ref={ref} style={{ position: "relative" }}>
        <span
          style={{
            width: "8px",
            height: "8px",
            cursor: "pointer",
            backgroundColor: "black",
            left: `calc(${value.x * 100}% - ${rem(8)})`,
            top: `calc(${value.y * 100}% - ${rem(8)})`,
            position: "absolute",
            // borderRadius: "1000px",
          }}
        ></span>
        <svg viewBox="0 0 200 200" preserveAspectRatio="none">
          <line
            x1="100"
            y1="0"
            x2="100"
            y2="200"
            stroke="black"
            stroke-width="1"
          />
          <line
            x1="0"
            y1="100"
            x2="200"
            y2="100"
            stroke="black"
            stroke-width="1"
          />
        </svg>
      </Center>
      w: {value.x} h: {value.y}
    </>
  );
}
