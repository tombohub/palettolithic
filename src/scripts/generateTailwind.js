import { generateFrameworkObject } from "./createPalette.js";

function generateTailwind(palette) {
  const frameworkObject = generateFrameworkObject(palette);
  const colorObjects = JSON.stringify(frameworkObject, null, 2)
    .slice(1, -1)
    .trim()
    .replace(/"([^"]+)":/g, "$1:");

  const tailwindCode = `// tailwind.config.js
module.exports = {
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
    ${colorObjects}
    }
  }
}`;

  return tailwindCode;
}

export { generateTailwind };
