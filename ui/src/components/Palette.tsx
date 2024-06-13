import ColorScaleRow from "./ColorScaleRow";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Stack } from "@mantine/core";

/**
 * Hold the complete Palette. Which consists of Colors, inside Colors are Shades
 */
function Palette() {
  const palette = useAppSelector(state => state.app.currentPalette);

  // render the list of Color components based on colors.map and
  // pass the shades as props to the Color component, which it will use it to render
  // list of Shade component
  return (
    <Stack gap={"xs"} h={"100%"}>
      {palette.map(colorScale => (
        <ColorScaleRow
          key={colorScale.colorName}
          shades={colorScale.shades}
          colorName={colorScale.colorName}
        />
      ))}
    </Stack>
  );
}

export default Palette;
