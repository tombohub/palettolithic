import { ColorScale } from "./domain";

/**
 * Generates a Tailwind CSS configuration string for a color palette.
 *
 * @param {ColorScale[]} palette - An array of ColorPalette objects, each representing a different color and its shades.
 * @returns {string} A string representing the Tailwind CSS configuration for the color palette.
 */
function generateTailwind(palette: ColorScale[]): string {
  const colorObjects = palette.reduce((acc, { colorName, shades }) => {
    const shadeEntries = shades.reduce((shadeAcc, { weight, hexValue }) => {
      return `${shadeAcc}        ${weight}: "${hexValue}",\n`;
    }, "");

    return `${acc}      ${colorName}: {\n${shadeEntries}      },\n`;
  }, "");

  const tailwindCode = `{\n${colorObjects}}`;

  return tailwindCode;
}
export { generateTailwind };
