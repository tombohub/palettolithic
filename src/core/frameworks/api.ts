import { generateCodeTailwind, tailwindPalette } from "./tailwind3";
import { type Framework, type ColorScale } from "../appService";

function generateConfigurationCode(
  framework: Framework,
  palette: ColorScale[]
): string {
  switch (framework) {
    case "bootstrap5":
      throw new Error("not implemented");
    case "tailwind":
      return generateCodeTailwind(palette);
    case "css":
      throw new Error("not implemented");
    case "mantine":
      throw new Error("not implemented");
    default:
      throw new Error(`framework ${framework} is not implemented`);
  }
}

function getOriginalPalette(framework: Framework) {
  switch (framework) {
    case "bootstrap5":
      throw new Error("not implemented");
    case "tailwind":
      return tailwindPalette;
    case "css":
      throw new Error("not implemented");
    case "mantine":
      throw new Error("not implemented");
    default:
      throw new Error(`framework ${framework} is not implemented`);
  }
}

export { getOriginalPalette, generateConfigurationCode };
