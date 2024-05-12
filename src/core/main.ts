import { Framework } from "./domain";

export function createPalette(hexCode: string, framework: Framework): string {
  return framework + "code";
}
