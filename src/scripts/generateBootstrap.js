/* -------------------------------------------------------------------------- */
/*                 Generating Bootstrap custom code for theming                 */
/* -------------------------------------------------------------------------- */

const {
  generateFrameworkObject,
  createPalette,
} = require("./createPalette");

const palette = createPalette("#07c");

/**
 * WHAT: generates color variables for bootstrap
 * WHY: it's part of the bootstrap theming
 * @param {object} frameworkObject framework object from palette
 */
function generateColorVariables(obj) {
  let variables = "";
  for (const color in obj) {
    variables += "\n";
    for (const [shade, hex] of Object.entries(obj[color])) {
      variables += `$${color}-${shade}: ${hex}; \n`;
    }
  }

  return variables;
}

/**
 * WHAT: generates the Bootstrap scss variables for css
 * WHY: Botstrap uses these variables to generate vanilla css variables
 */
function generateCssColors(obj) {
  let variables = "";
  for (const color in obj) {
    variables += `$${color}: ${color}-600;\n`;
  }
  return variables;
}

function generateThemeMap(obj) {
  let colors = "";

  for (const color in obj) {
    colors += "\n";
    for (const shade in obj[color]) {
      colors += `  "${color}-${shade}": $${color}-${shade},\n`;
    }
  }
  const map = `$theme-colors: (\n` + `${colors}` + `);`;
  return map;
}

function generateBootstrapCode(palette) {
  const frameworkObject = generateFrameworkObject(palette);

  const variables = generateColorVariables(frameworkObject);
  const cssColors = generateCssColors(frameworkObject);
  const map = generateThemeMap(frameworkObject);

  const bootstrapCode = `${variables}\n\n${cssColors}\n\n${map}`;

  return bootstrapCode;
}

console.log(generateBootstrapCode(palette));
