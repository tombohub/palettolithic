import {
    generateFrameworkObject
} from "./createPalette.js";

// `
// :root {
//     --red-100: #ff0000;
//     --blue-100: #222222;
// }

// `



function generateCssVariables(palette) {
    const frameworkObject = generateFrameworkObject(palette);
    let variables = "";
    for (const color in frameworkObject) {
        variables += "\n";
        for (const [shade, hex] of Object.entries(frameworkObject[color])) {
            variables += `--${color}-${shade}: ${hex}; \n`;
        }
    }

    const cssCode = `:root {
        ${variables}
}`

    return cssCode
}

export {
    generateCssVariables
}