import { ColorScale } from "../core/domain";

/**
 * Returns an array of color names from the given palette.
 *
 * @param palette - The color scale palette.
 * @returns An array of color names.
 */
export function getPaletteColors(palette: ColorScale[]): string[] {
  return palette.map(colorScale => colorScale.colorName);
}
