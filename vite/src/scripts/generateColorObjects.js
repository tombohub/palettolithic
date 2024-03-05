import { generateFrameworkObject } from "./createPalette.js";

function generateColorObjectsCode(palette) {
  const frameworkObject = generateFrameworkObject(palette);
  const colorObjects = JSON.stringify(frameworkObject, null, 2)
    .slice(1, -1)
    .trim()
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/\n/g, "\n    ");

  const tailwindCode = `
      ${colorObjects}`;

  return tailwindCode;
}

export { generateColorObjectsCode };
