import { generateFrameworkObject } from "./createPalette.js";

function generateTailwind(palette) {
  const frameworkObject = generateFrameworkObject(palette);
  const colorObjects = JSON.stringify(frameworkObject, null, 2)
    .slice(1, -1)
    .trim()
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/\n/g, "\n    ");

  const tailwindCode = `//tailwind.config.js
  colors: {
      ${colorObjects}
  }`;

  return tailwindCode;
}

export { generateTailwind };
