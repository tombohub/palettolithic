import { Framework } from "@/core/domain";
import { createPalette } from "@/core/palette";
import { generateCode } from "@/core/code";

export const INITIAL_HEX_VALUE = "07c";
export const INITAL_PALETTE = createPalette(INITIAL_HEX_VALUE);
export const INITIAL_FRAMEWORK: Framework = "tailwind";
export const INITIAL_CONFIGURATION_CODE = generateCode(
  INITIAL_FRAMEWORK,
  INITAL_PALETTE
);
export const INITIAL_CODE_LANGUAGE = "javascript";
