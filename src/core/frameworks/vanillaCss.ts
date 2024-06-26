import { type IFramework, type ChromaticColorScale } from "./types";

/**
 * Generates CSS color variables template
 * @param {ChromaticColorScale[]} palette palette object generated by user choosing color
 */
export function generateCssVariables(palette: ChromaticColorScale[]): string {
  let variables = "";

  palette.forEach(({ colorName, shades }) => {
    shades.forEach(({ weight, hexCode }) => {
      variables += `--${colorName}-${weight}: ${hexCode};\n`;
    });
    variables += "\n";
  });

  return variables.trim(); // Remove the trailing newline for clean output
}
