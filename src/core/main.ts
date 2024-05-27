import { Framework } from "./domain/domain";
import { makeHex } from "./domain/hex";
import { generateCode as generateBootstrap4Code } from "./frameworks/boostrap4";
import { generateCode as generateCssCode } from "./frameworks/vanillaCss";

export function generateCode(hexCode: string, framework: Framework): string {
  const hex = makeHex(hexCode);
  switch (framework) {
    case "tailwind":
      return "taliwind code";
    case "bootstrap 4":
      return generateBootstrap4Code(hex);
    case "css":
      return generateCssCode(hex);
    case "mantine":
      return "mantino code";
  }
}
