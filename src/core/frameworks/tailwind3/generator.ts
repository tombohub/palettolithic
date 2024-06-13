import { type PaletteShade, type ColorScale } from "../../domain/types";

function generateShadeValue(shade: PaletteShade): string {
  return `${shade.weight}: '${shade.hexCode}',\n`;
}

function generateShadesObject(shades: PaletteShade[]): string {
  const openingBrace = "{\n";
  const closingBrace = "},\n";
  const indent = "  ";
  const shadeValuesArray = shades.map(x => indent + generateShadeValue(x));
  const shadeValuesString = shadeValuesArray.join("");
  return openingBrace + shadeValuesString + closingBrace;
}

function generateColorObject(color: ColorScale): string {
  const colorKey = `'${color.colorName}'`;
  const shadesObject = generateShadesObject(color.shades);
  return `${colorKey}: ${shadesObject}`;
}

export function generateConfigCode(palette: ColorScale[]): string {
  const colorObjectsArray = palette.map(x => generateColorObject(x));
  const colorObjectsString = colorObjectsArray.join("");
  return colorObjectsString;
}
