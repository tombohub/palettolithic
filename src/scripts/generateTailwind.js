import { generateFrameworkObject } from "./createPalette";

function generateTailwind(palette) {
  const frameworkObject = generateFrameworkObject(palette);
  const tailwindCode = JSON.stringify(frameworkObject, null, 2)
    .slice(1, -1)
    .trim()
    .replace(/"([^"]+)":/g, "$1:");

  return tailwindCode;
}

module.exports = generateTailwind;
