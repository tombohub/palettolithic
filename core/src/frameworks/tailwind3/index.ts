import { IFramework, type ColorScale } from "../types";
import { palette } from "./data";

export const frameworkTailwind: IFramework = {
  generateCode: k => "tailwind code",
  getOriginalPalette: () => {
    return palette;
  },
};
