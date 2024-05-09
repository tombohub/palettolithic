import { ColorName, ColorScale } from "../domain";
import { getColorShadesHexValues } from "../palette";

type MantineColors = {
  [K in ColorName]: string[];
};

export function generateMantine(palette: ColorScale[]): MantineColors {
  const mantineColors: Partial<MantineColors> = {};
  palette.forEach(scale => {
    mantineColors[scale.colorName] = getColorShadesHexValues(scale);
  });
  return mantineColors as MantineColors;
}
