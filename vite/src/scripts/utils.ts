import { ColorScale } from "./domain";

/**
 * Returns an array of color names from the given palette.
 *
 * @param palette - The color scale palette.
 * @returns An array of color names.
 */
export function getPaletteColors(palette: ColorScale[]): string[] {
  return palette.map(colorScale => colorScale.colorName);
}

/**
 * Returns an array of hex values for the shades in a color scale.
 * @param colorScale - The color scale object.
 * @returns An array of hex values for the shades in the color scale.
 */
export function getColorShadesHexValues(colorScale: ColorScale): string[] {
  const hexValues = colorScale.shades.map(shade => shade.hexValue);
  return hexValues;
}
