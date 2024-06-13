import { type IFramework, type ColorScale } from "./types";

export const frameworkCss: IFramework = {
  generateCode: () => "css code",
  getOriginalPalette: () => {},
};

/**
 * Generates CSS color variables template
 * @param {ColorScale[]} palette palette object generated by user choosing color
 */
export function generateCssVariables(palette: ColorScale[]): string {
  let variables = "";

  palette.forEach(({ colorName, shades }) => {
    shades.forEach(({ weight, hexCode }) => {
      variables += `--${colorName}-${weight}: ${hexCode};\n`;
    });
    variables += "\n";
  });

  return variables.trim(); // Remove the trailing newline for clean output
}
