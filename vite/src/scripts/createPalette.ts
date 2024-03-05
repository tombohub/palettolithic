/**
 * Create Palette
 * ==============
 *
 * Module responsible for creating the color palette,
 * based on one single color,
 * and produce the 12 color palette with 9 shades of each color.
 * The colors are in form of HEX codes which are used by specific
 * CSS frameworks to generate their own config code.
 *
 * To create palette this module uses chroma.js package.
 * We need to chose the luminosity of each shade.
 * Saturation and hue is based on initial base color.
 */

import chroma from "chroma-js";

/**
 * Names to give each color
 */
const colorNames = [
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
] as const;

type ColorName = (typeof colorNames)[number];

/**
 * Color hue, must be between 0 and 360
 */
type Hue = number;

/**
 * Represents hue range for specific color
 */
interface ColorHueRange {
  colorName: ColorName;
  min: Hue;
  max: Hue;
}

const colorHueRanges: ColorHueRange[] = [
  { colorName: "red", min: 0, max: 30 },
  { colorName: "orange", min: 30, max: 60 },
  { colorName: "yellow", min: 60, max: 90 },
  { colorName: "lime", min: 90, max: 120 },
  { colorName: "green", min: 120, max: 150 },
  { colorName: "teal", min: 150, max: 180 },
  { colorName: "cyan", min: 180, max: 210 },
  { colorName: "blue", min: 210, max: 240 },
  { colorName: "indigo", min: 240, max: 270 },
  { colorName: "violet", min: 270, max: 300 },
  { colorName: "purple", min: 300, max: 330 },
  { colorName: "pink", min: 330, max: 360 },
  { colorName: "red", min: 360, max: 360 },
];

/**
 * What: Get the hue color name from hue number value.
 * Why: to connect the color code with the appropriate color name
 * @param {Hue} hue hue value of a color {0..360}
 * @returns {ColorName} name of the color
 */
export function hueToColorName(hue: Hue): ColorName {
  const colorHueRange = colorHueRanges.find(
    color => color.min <= hue && hue < color.max
  );
  return colorHueRange!.colorName;
}

/**
 * WHAT: Array of lightness values, for each color shade.
 *
 * WHY: Lighntess value is use to create shades. From lighter to darker
 */
const lights = [0.95, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1];

// const lums = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
// .map(n => n + 0.5)
// .map(n => n / 10);

// const lums = [0.95, 0.85, 0.75, 0.65, 0.55, 0.45, 0.35, 0.25, 0.15, 0.05];

/**
 * Creates an array of integers from 0 to {length} we want
 * @param {Number} length length of array you want to create
 */
function createArray(length: number) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(i);
  }
  return arr;
}

/**
 * Creates the Array of hues (colors) starting from base hue and going
 * through the whole hue circle
 * @param {number} length number of hues we want to get
 * @returns {function} function ti create array of hues
 * @returns {array} list of hues to match the base hue
 */
const createHues = (length: number) => {
  const hueStep = 360 / length;

  return (baseHue: number) => {
    const hues = createArray(length).map(n =>
      Math.floor((baseHue + n * hueStep) % 360)
    );

    return hues;
  };
};

/**
 * Modifies the saturation of a given hex color
 * @param {float} newSaturation new saturation value {0..1}
 * @returns {function} color with new saturation level
 */
const desat = (newSaturation: number) => (hex: string) => {
  const [h, _, l] = chroma(hex).hsl();
  return chroma.hsl(h, newSaturation, l).hex();
};

/**
 * Creates a darkest gray color in pallete from the base color.
 * First desaturate to {1/8} of base color saturation then returns it with {0.05} luminance.
 * Those values we can change later on.
 * @param {string} hex hex value of color
 * @returns {string} hex value of the darkest gray in palette
 */
const createBlack = (hex: string): string => {
  const black = desat(1 / 8)(hex);
  return chroma(black).luminance(0.05).hex();
};

/**
 * Creates shades of single color. Using luminance values.
 * @param {string} hex hex value of color
 * @returns {Array} shade hex values for given color
 */
const createShades = (hex: string): string[] => {
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
// return lums.map(lum => {
//     return chroma(hex).luminance(lum).hex();
// });
// };

/**
 * Gets the color name from hex value
 * @param {string} hex color hex value
 * @returns {string} color name {yellow, blue, etc..}
 */
function hexToColorName(hex: string): ColorName {
  const [hue, saturation] = chroma(hex).hsl();
  // if (saturation < 0.5) {
  // return "gray";
  // }
  const colorName = hueToColorName(hue);
  return colorName;
}

/* ------------------------------ Main Function ----------------------------- */

interface ColorPalette {
  colorName: ColorName | "gray";

  /**
   * Array of hex values
   */
  shades: string[];
}

/**
 * Creates the whole palette according to one base color
 * @param {string} hex base color hex value
 * @returns {object} 12 hues with 10 shades each in object {color:[hex,...]}
 */
function createPalette(hex: string): ColorPalette[] {
  const chromaColor = chroma(hex);
  const colorShades: ColorPalette[] = [];
  const [hue, sat, lte] = chromaColor.hsl();

  const hues = createHues(12)(hue);

  // // add darkest color to colors[]
  // colors.push({
  // key: "black",
  // value: createBlack("" + color.hex()),
  // });

  // add shades of gray to colors[]
  colorShades.push({
    colorName: "gray",
    shades: createShades(desat(1 / 25)("" + chromaColor.hex())),
  });

  // add shades of hues to colors[]
  // temporary fix in case hue is NaN it will go trough list here and on
  // the website only gray will be shown
  if (!isNaN(hue)) {
    hues.forEach(hue => {
      const chromaColor = chroma.hsl(hue, sat, lte);
      const colorName = hexToColorName(chromaColor.hex());
      colorShades.push({
        colorName,
        shades: createShades("" + chromaColor.hex()),
      });
    });
  }
  return colorShades;
}

export { createPalette };
