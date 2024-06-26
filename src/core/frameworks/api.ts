import {
  generateCodeTailwind,
  chromaticPalette,
  neutralPalette,
} from "./tailwind3";
import {
  generateConfigCode as generateCodeBootstrap5,
  chromaticPalette as chromaticPaletteBootstrap5,
  neutralPalette as neutralPaletteBootstrap5,
} from "./bootstrap5";
import { type Framework, type ColorScale } from "../appService";

function generateConfigurationCode(
  framework: Framework,
  palette: ColorScale[]
): string {
  switch (framework) {
    case "bootstrap5":
      return generateCodeBootstrap5(palette);
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

function getChromaticPalette(framework: Framework) {
  switch (framework) {
    case "bootstrap5":
      return chromaticPaletteBootstrap5;
    case "tailwind":
      return chromaticPalette;
    case "css":
      throw new Error("not implemented");
    case "mantine":
      throw new Error("not implemented");
    default:
      throw new Error(`framework ${framework} is not implemented`);
  }
}

export function getNeutralPalette(framework: Framework) {
  switch (framework) {
    case "bootstrap5":
      return neutralPaletteBootstrap5;
    case "tailwind":
      return neutralPalette;
    case "css":
      throw new Error("not implemented");
    case "mantine":
      throw new Error("not implemented");
    default:
      throw new Error(`framework ${framework} is not implemented`);
  }
}

export { getChromaticPalette, generateConfigurationCode };
