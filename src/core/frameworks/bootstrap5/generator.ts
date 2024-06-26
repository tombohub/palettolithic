import { type PaletteShade, type ColorScale } from "../../domain/types";

function scssVariable(
  colorName: string,
  weight: number,
  hexCode: string
): string {
  return `$${colorName}-${weight}: ${hexCode};`;
}

function scssShadesList(shades: PaletteShade[], colorName: string): string {
  const scale: string[] = shades.map(
    x => `${scssVariable(colorName, x.weight, x.hexCode)}`
  );
  return scale.join("\n");
}

export function generateConfigCode(palette: ColorScale[]): string {
  const scssVariableList = palette.map(x =>
    scssShadesList(x.shades, x.colorName)
  );
  return scssVariableList.join("\n\n");
}
