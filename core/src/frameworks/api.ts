import { frameworkBootstrap5 } from "./bootstrap5";
import { frameworkMantine } from "./mantine";
import { frameworkTailwind } from "./tailwind3";
import { frameworkCss } from "./vanillaCss";
import { type IFramework } from "./types";
import { type IFrameworkModuleApi, type Framework } from "../appService";

function generateConfigurationCode(framework: Framework): string {
  const f = frameworkFactory(framework);
  const code = f.generateCode();
  return code;
}

function getOriginalPalette(framework: Framework) {
  const f = frameworkFactory(framework);
  const data = f.getOriginalPalette();
  return data;
}

/**
 * Returns concrete framework implementation
 * @param framework on of the supported frameworks
 * @returns concrete framework implementation
 */
function frameworkFactory(framework: Framework): IFramework {
  switch (framework) {
    case "bootstrap5":
      return frameworkBootstrap5;
    case "tailwind":
      return frameworkTailwind;
    case "css":
      return frameworkCss;
    case "mantine":
      return frameworkMantine;
    default:
      throw new Error(`framework ${framework} is not implemented`);
  }
}

const frameworkModule: IFrameworkModuleApi = {
  getOriginalPalette,
  generateConfigurationCode,
};

export { frameworkModule };
