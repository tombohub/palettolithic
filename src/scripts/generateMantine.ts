import { ColorName, ColorScale } from "../core/domain";
import { getColorShadesHexValues } from "../core/palette";

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
