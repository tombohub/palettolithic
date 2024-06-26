import { chromaticPalette } from "./frameworks/bootstrap5/data";
import { generateConfigurationCode } from "../core/frameworks";

const l = generateConfigurationCode("bootstrap5", chromaticPalette);

console.log(l);
