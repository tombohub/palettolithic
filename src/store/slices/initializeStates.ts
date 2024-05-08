import { Framework } from "@/core/domain";
import { createPalette } from "@/core/palette";
import { generateTailwind } from "@/scripts/generateTailwind";

export const INITIAL_HEX_VALUE = "07c";
export const INITAL_PALETTE = createPalette(INITIAL_HEX_VALUE);
export const INITIAL_FRAMEWORK: Framework = "tailwind";
export const INITIAL_CONFIGURATION_CODE = generateTailwind(INITAL_PALETTE);
