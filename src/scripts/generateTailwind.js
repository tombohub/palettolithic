const { generateFrameworkObject } = require("./createPalette");

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
    ${colorObjects}
    }
  }
}`;

  return tailwindCode;
}

module.exports = generateTailwind;
