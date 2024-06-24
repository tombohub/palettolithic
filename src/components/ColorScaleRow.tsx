import Shade from "./Shade";
import { Box, SimpleGrid } from "@mantine/core";
import { type ColorScale } from "@/core";

interface Props {
  /**
   * hex values of each shade
   */
  shades: ColorScale["shades"];

  colorName: string;
}

/**
 * Hold Shades of single Color. It lists all the Shades of the Color passed in props from
 * Pallete component.
 * @param {object} props passed from App->Palette. Single color
 */
export default function ColorScaleRow(props: Props) {
  return (
    // grid is shades.count + 1 for shades + color name
    <SimpleGrid cols={props.shades.length + 1} h={"100%"} spacing={"xs"}>
      <Box component="span" style={{ alignSelf: "center" }}>
        {props.colorName.toUpperCase()}:
      </Box>
      {props.shades.map(shade => (
        <Shade key={shade.weight} shadeHexValue={shade.hexCode} />
      ))}
    </SimpleGrid>
  );
}
