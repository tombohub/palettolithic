import { ColorScale, Framework } from "../core/domain";
import { generateTailwind } from "./frameworks/tailwindcss";
import { generateBootstrap4 } from "./frameworks/boostrap4";
import { generateCssVariables } from "./frameworks/vanillaCss";

/**
 * Generates configuration code based on the selected framework and color palette.
 *
 * @param {Framework} framework - The selected framework.
 * @param {ColorScale[]} palette - An array of ColorScale objects representing the color palette.
 * @returns {string} The generated code.
 */
export function generateCode(
  framework: Framework,
  palette: ColorScale[]
): string {
  switch (framework) {
    case "tailwind":
      return generateTailwind(palette);
    case "bootstrap 4":
      return generateBootstrap4(palette);
    case "css":
      return generateCssVariables(palette);
    case "mantine":
      return "not implemented";
  }
}
