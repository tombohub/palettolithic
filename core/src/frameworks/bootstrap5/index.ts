import { type IFramework } from "../types";
import { palette } from "./data";

const frameworkBootstrap5: IFramework = {
  generateCode: () => " bootstrap 5 code",
  getOriginalPalette: () => palette,
};

export { frameworkBootstrap5 };
