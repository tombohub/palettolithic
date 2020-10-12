"use strict";

const chroma = require("chroma-js");

const names = [
  "red", // 0
  "orange", // 30
  "yellow", // 60
  "lime", // 90
  "green", // 120
  "teal", // 150
  "cyan", // 180
  "blue", // 210
  "indigo", // 240
  "violet", // 270
  "purple", // 300
  "pink", // 330
  "red", // 360
];

/**
 * What: Get the hue color name from hue number value.
 * Why: to connect the color code with the appropriate color name
 * @param {Number} hue hue value of a color {0..360}
 * @returns {String} name of the color
 */
const hueName = hue => {
  const i = Math.round(hue / 30);
  const name = names[i];
  return name;
};

/**
 * WHAT: Array of lightness values, for each color shade.
 * WHY: Lighntess value is use to create shades. From lighter to darker
 */
const lights = [0.95, 0.86, 0.78, 0.69, 0.6, 0.51, 0.43, 0.34, 0.25];

// const lums = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
//   .map(n => n + 0.5)
//   .map(n => n / 10);

// console.log(lums);
const lums = [
  0.95,
  0.85,
  0.75,
  0.65,
  0.55,
  0.45,
  0.35,
  0.25,
  0.15,
  0.05,
];

/**
 * Creates an array of integers from 0 to {length} we want
 * @param {Number} length length of array you want to create
 */
const createArray = length => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(i);
  }
  return arr;
};

/**
 * Creates the Array of hues (colors) starting from base hue and going
 * through the whole hue circle
 * @param {Number} length number of hues we want to get
 * @returns {function} function ti create array of hues
 * @returns {array} list of hues to match the base hue
 */
const createHues = length => {
  const hueStep = 360 / length;

  return baseHue => {
    const hues = createArray(length).map(n =>
      Math.floor((baseHue + n * hueStep) % 360)
    );

    return hues;
  };
};

/**
 * Modifies the saturation of a given hex color
 * @param {float} newSaturation new saturation value {0..1}
 * @returns {object} color with new saturation level
 */
const desat = newSaturation => hex => {
  const [h, s, l] = chroma(hex).hsl();
  return chroma.hsl(h, newSaturation, l).hex();
};

/**
 * Creates a darkest gray color in pallete from the base color.
 * First desaturate to {1/8} of base color saturation then returns it with {0.05} luminance.
 * Those values we can change later on.
 * @param {string} hex hex value of color
 * @returns {string} hex value of the darkest gray in palette
 */
const createBlack = hex => {
  const black = desat(1 / 8)(hex);
  return chroma(black).luminance(0.05).hex();
};

/**
 * Creates shades of single color. Using luminance values.
 * @param {string} hex hex value of color
 * @returns {Array} shade hex values for given color
 */
const createShades = hex => {
  const [hue, saturation, lightness] = chroma(hex).hsl();
  return lights.map(light => {
    return chroma.hsl(hue, saturation, light).hex();
  });
};

/**
 * WHAT: Creates shades of a single color. Using luminosity.
 * WHY: We need shades to create palette.
 * NOTE: Original code from palx package.
 * @param {string} hex color hex cod
 */
// const createShades = hex => {
//   return lums.map(lum => {
//     return chroma(hex).luminance(lum).hex();
//   });
// };

/**
 * Gets the color name from hex value
 * @param {string} hex color hex value
 * @returns {string} color name {yellow, blue, etc..}
 */
const keyword = hex => {
  const [hue, saturation] = chroma(hex).hsl();
  // if (saturation < 0.5) {
  //   return "gray";
  // }
  const colorName = hueName(hue);
  return colorName;
};

// Reducer
const toObj = (a, color) => {
  const key = a[color.key] ? color.key + "2" : color.key;
  a[key] = color.value;
  return a;
};

/* ------------------------------ Main Function ----------------------------- */

/**
 * Creates the whole palette according to one base color
 * @param {string} hex base color hex value
 * @returns {object} 12 hues with 10 shades each in object
 */
function createPalette(hex) {
  const color = chroma(hex);
  const colors = [];
  const [hue, sat, lte] = color.hsl();

  const hues = createHues(12)(hue);

  // // add darkest color to colors[]
  // colors.push({
  //   key: "black",
  //   value: createBlack("" + color.hex()),
  // });

  // add shades of gray to colors[]
  colors.push({
    key: "gray",
    value: createShades(desat(1 / 25)("" + color.hex())),
  });

  //add shades of hues to colors[]
  hues.forEach(hue => {
    const color = chroma.hsl(hue, sat, lte);
    const key = keyword(color);
    colors.push({
      key,
      value: createShades("" + color.hex()),
    });
  });

  const obj = colors.reduce(toObj, {});

  return obj;
}

/**
 *WHAT: generates Tailwindcss code to put inside tailwind config file
 *WHY: original palette code is different than tailwind config.
 * @param {object} palette color pallete like: {color:[hex,...]}
 */
function generateTailwindcss(palette) {
  const colors = Object.keys(palette);

  // to assign 100, 200 ... to each shade
  const assignShades = color => {
    let i = 100;
    let shades = {};
    for (const shade of palette[color]) {
      shades[parseInt(i)] = shade;
      i += 100;
    }
    return shades;
  };

  let tailwind = {};
  for (const color of colors) {
    tailwind[color] = assignShades(color);
  }

  return tailwind;
}

module.exports = { createPalette, generateTailwindcss };
