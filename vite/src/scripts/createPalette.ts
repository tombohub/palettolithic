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
import {
  type ChromaticColorName,
  type ColorScale,
  colorHueRanges,
  ColorShade,
  shadeWeights,
  ShadeWeight,
  ShadeLightness,
} from "./domain";

/**
 * What: Get the hue color name from hue number value.
 * Why: to connect the color code with the appropriate color name
 * @param {number} hue hue value of a color {0..360}
 * @returns {ChromaticColorName} name of the color
 */
export function hueToColorName(hue: number): ChromaticColorName {
  const colorHueRange = colorHueRanges.find(
    color => color.min <= hue && hue < color.max
  );
  return colorHueRange!.colorName;
}

/**
 * creates color lightness that corresponds to the specific shade weight.
 * Lower shades are higher lightness.
 * @param shade shade weight
 * @returns color lightness to correspond to the shade weight
 */
export function createLightness(shade: ShadeWeight): number {
  return (1000 - shade) / 1000;
}

/**
 * WHAT: Array of lightness values, for each color shade.
 *
 * WHY: Lighntess value is use to create shades. From lighter to darker
 */
function createShadeLightValues(): ShadeLightness[] {
  const mapShadeLight = (shade: ShadeWeight): ShadeLightness => ({
    shade: shade,
    lighntess: createLightness(shade),
  });

  const shadeLights: ShadeLightness[] = shadeWeights.map(shade =>
    mapShadeLight(shade)
  );

  return shadeLights;
}

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
 * Adjusts the lightness of a given color.
 *
 * @param {string} hex - The hex code of the color to adjust.
 * @param {number} newLightness - The new lightness value to apply.
 * @returns {string} The hex code of the color with adjusted lightness with # prefix
 */
export function adjustLighntess(hex: string, newLightness: number) {
  const [hue, saturation, lighntess] = chroma(hex).hsl();
  const adjustedHex = chroma.hsl(hue, saturation, newLightness).hex();
  return adjustedHex;
}

/**
 * Maps a hex color to a specific shade by adjusting its lightness.
 *
 * @param {string} hex - The hex code of the color to adjust.
 * @param {ShadeWeight} shade - The weight of the shade to map to.
 * @returns {string} The hex code of the color adjusted to the specified shade.
 */
function mapHexToShade(hex: string, shade: ShadeWeight): ColorShade {
  const lightness = createLightness(shade);
  const shadeHex = adjustLighntess(hex, lightness);
  return { weight: shade, hexValue: shadeHex };
}

/**
 * Creates an array of color shades from a single color by adjusting its lightness.
 *
 * @param {string} hex - The hex code of the color to create shades from.
 * @returns {ColorShade[]} An array of ColorShade objects, each representing a different shade of the input color.
 */
function createShadeHexValues(hex: string): ColorShade[] {
  const shades = shadeWeights.map(shade => mapHexToShade(hex, shade));
  return shades;
}

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
function hexToColorName(hex: string): ChromaticColorName {
  const [hue, saturation] = chroma(hex).hsl();
  // if (saturation < 0.5) {
  // return "gray";
  // }
  const colorName = hueToColorName(hue);
  return colorName;
}

/* ------------------------------ Main Function ----------------------------- */

/**
 * Creates the whole palette according to one base color
 * @param {string} hex base color hex value
 * @returns {object} 12 hues with 10 shades each in object {color:[hex,...]}
 */
function createPalette(hex: string): ColorScale[] {
  const chromaColor = chroma(hex);
  const palette: ColorScale[] = [];
  const [hue, sat, lte] = chromaColor.hsl();

  const hues = createHues(12)(hue);

  // // add darkest color to colors[]
  // colors.push({
  // key: "black",
  // value: createBlack("" + color.hex()),
  // });

  // add shades of gray to colors[]
  palette.push({
    colorName: "gray",
    shades: createShadeHexValues(desat(1 / 25)("" + chromaColor.hex())),
  });

  // add shades of hues to colors[]
  // temporary fix in case hue is NaN it will go trough list here and on
  // the website only gray will be shown
  if (!isNaN(hue)) {
    hues.forEach(hue => {
      const chromaColor = chroma.hsl(hue, sat, lte);
      const colorName = hexToColorName(chromaColor.hex());
      palette.push({
        colorName,
        shades: createShadeHexValues("" + chromaColor.hex()),
      });
    });
  }
  return palette;
}

export { createPalette };
