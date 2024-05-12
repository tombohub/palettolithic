import { Framework } from "./domain";

export function genCode(hexCode: string, framework: Framework): string {
  return framework + "code";
}
