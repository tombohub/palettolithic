/* -------------------------------------------------------------------------- */
/*                 Generating Bootstrap custom code for theming                 */
/* -------------------------------------------------------------------------- */

import { ColorPalette } from "./domain.js";
import { createPalette } from "./createPalette.js";

/**
 * Generates a SCSS variable for a specific color shade.
 *
 * @param {string} colorName - The name of the color.
 * @param {number} shadeWeight - The weight of the color shade.
 * @param {string} hexValue - The hex code of the color shade.
 * @returns {string} A SCSS variable representing the color shade.
 */
function generateScssColorVariable(
  colorName: string,
  shadeWeight: number,
  hexValue: string
) {
  return `$${colorName}-${shadeWeight}: ${hexValue};\n`;
}

/**
 * Generates SCSS variables for a bootstrap color palette.
 *
 * @param {ColorPalette[]} palette - An array of ColorPalette objects, each representing a different color and its shades.
 * @returns {string} A string of SCSS variables representing the color palette.
 */
function generateColorVariables(palette: ColorPalette[]): string {
  let variables = "";

  palette.forEach(({ colorName, shades }) => {
    shades.forEach(({ hexValue, weight }) => {
      variables += generateScssColorVariable(colorName, weight, hexValue);
    });
    variables += "\n";
  });

  return variables;
}

/**
 * WHAT: generates the Bootstrap scss variables for css
 * WHY: Botstrap uses these variables to generate vanilla css variables
 */
function generateCssColors(palette: ColorPalette[]): string {
  let variables = "";

  palette.forEach(({ colorName }) => {
    variables += `$${colorName}: $${colorName}-500;\n`;
  });

  return variables;
}

/**
 * WHAT: generates scss theme-colors() map
 * WHY: bootstrap generates classes names from this map
 * @param {ColorPalette[]} palette
 */
function generateThemeMap(palette: ColorPalette[]): string {
  let colors = "";

  palette.forEach(({ colorName, shades }) => {
    shades.forEach(({ hexValue, weight }) => {
      colors += `  "${colorName}-${weight}": $${colorName}-${weight},\n`;
    });
    colors += "\n";
  });

  const map = `$theme-colors: (\n${colors});`;
  return map;
}

/* ------------------------------ Main Function ----------------------------- */

/**
 * WHAT: generates complete custom code for Bootstrap
 * WHY: user can copy paste code to theme Bootstrap
 * @param {ColorPalette[]} palette palette object as {color:[hex1, hex2,...]}
 */
function generateBootstrap(palette: ColorPalette[]) {
  const variables = generateColorVariables(palette);
  const cssColors = generateCssColors(palette);
  const map = generateThemeMap(palette);

  const bootstrapCode = `${variables}\n\n${cssColors}\n\n${map}`;

  return bootstrapCode;
}

const palette = createPalette("#ff3342");
console.log(generateBootstrap(palette));

export { generateBootstrap };
