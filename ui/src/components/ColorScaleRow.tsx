import Shade from "./Shade";
import { Box, SimpleGrid } from "@mantine/core";

interface Props {
  /**
   * hex values of each shade
   */
  shades: string[];

  colorName: ColorName;
}

/**
 * Hold Shades of single Color. It lists all the Shades of the Color passed in props from
 * Pallete component.
 * @param {object} props passed from App->Palette. Single color
 */
export default function ColorScaleRow(props: Props) {
  if (!Array.isArray(props.shades)) return false;
  return (
    <SimpleGrid cols={11} h={"100%"} spacing={"xs"}>
      <Box component="span" style={{ alignSelf: "center" }}>
        {props.colorName.toUpperCase()}:
      </Box>
      {props.shades.map(shade => (
        <Shade key={shade} shadeHexValue={shade} />
      ))}
    </SimpleGrid>
  );
}
