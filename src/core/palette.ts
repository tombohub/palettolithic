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
  type ColorHueRange,
  ColorShade,
  shadeWeights,
  ShadeWeight,
  colorHueRanges,
} from "./domain";
import { createArray } from "./utils";
import {
  validateHexColorValue,
  validateLuminosity,
  validateSaturation,
} from "./validators";

/**
 * What: Get the hue color name from hue number value.
 * Why: to connect the color code with the appropriate color name
 * @param {number} hue hue value of a color {0..360}
 * @returns {ChromaticColorName} name of the color
 */
export function hueToColorName(
  hue: number,
  colorHueRanges: ColorHueRange[]
): ChromaticColorName {
  const colorHueRange = colorHueRanges.find(
    color => color.start <= hue && hue <= color.end
  );
  return colorHueRange!.colorName;
}

/**
 * creates color lightness that corresponds to the specific shade weight.
 * Lower shades are higher lightness.
 * @param shade shade weight
 * @returns color lightness to correspond to the shade weight, between 0-1
 */
export function createLightness(shade: ShadeWeight): number {
  return (1000 - shade) / 1000;
}

// export function createShades(color: Color, luminosities: number[]): Color[] {
//   const hexShades = luminosities.map(lum => {
//     const newHex = modifyLuminosity(color.hex, lum);
//     const modifiedColor: Color = Color.fromHex(newHex);
//     return modifiedColor;
//   });

//   return hexShades;
// }

/**
 * Creates the Array of hues (colors) starting from base hue and going
 * through the whole hue circle
 * @param {number} length number of hues we want to get
 * @returns {function} function ti create array of hues
 * @returns {array} list of hues to match the base hue
 */
function createHues(length: number) {
  const hueStep = 360 / length;

  return (baseHue: number) => {
    const hues = createArray(length).map(n =>
      Math.floor((baseHue + n * hueStep) % 360)
    );

    return hues;
  };
}

/**
 * Modifies the saturation of a given hex color
 *
 * Saturation is S from HSL color code
 *
 * @param {string} hex hex color code on which to change saturation
 * @param {number} newSaturation new saturation value {0..1}
 * @returns {function} color with new saturation level
 */
export function modifySaturation(hex: string, newSaturation: number): string {
  if (!validateHexColorValue(hex)) {
    throw new Error(`Invalid hex value: ${hex}`);
  }
  if (!validateSaturation(newSaturation)) {
    throw new Error(`Invalid saturation value: ${newSaturation}`);
  }

  const [hue, _, luminosity] = chroma(hex).hsl();
  const newHex = chroma.hsl(hue, newSaturation, luminosity).hex();
  return newHex;
}

/**
 * Apply luminosity to the hexcode and get new hex code.
 *
 * Luminosity is L from HSL
 *
 * @param {string} hexCode - The hex code of the color to adjust.
 * @param {number} newLuminosity - The new luminosity value to apply {0..1}
 * @returns {string} The hex code of the color with adjusted lightness with # prefix
 */
export function modifyLuminosity(
  hexCode: string,
  newLuminosity: number
): string {
  if (!validateHexColorValue(hexCode)) {
    throw new Error(`Invalid hex code: ${hexCode}`);
  }
  if (!validateLuminosity(newLuminosity)) {
    throw new Error(`Invalid luminosity ${newLuminosity}`);
  }
  const [hue, saturation] = chroma(hexCode).hsl();
  const newHex = chroma.hsl(hue, saturation, newLuminosity).hex();
  return newHex;
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
  const shadeHex = modifyLuminosity(hex, lightness);
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
 * Gets the color name from hex value
 * @param {string} hex color hex value
 * @returns {string} color name {yellow, blue, etc..}
 */
function hexToColorName(hex: string): ChromaticColorName {
  const [hue, saturation] = chroma(hex).hsl();
  const colorName = hueToColorName(hue, colorHueRanges);
  return colorName;
}

/* ------------------------------ Main Function ----------------------------- */

/**
 * Creates the whole palette according to one base color
 * @param {string} hex base color hex value
 * @returns {object} 12 hues with 10 shades each in object {color:[hex,...]}
 */
export function createPalette(hex: string): ColorScale[] {
  const chromaColor = chroma(hex);
  const palette: ColorScale[] = [];
  const [hue, sat, lte] = chromaColor.hsl();

  const hues = createHues(12)(hue);

  // add shades of gray to colors[]
  palette.push({
    colorName: "gray",
    shades: createShadeHexValues(modifySaturation(chromaColor.hex(), 1 / 25)),
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

/**
 * Returns an array of hex values for the shades in a color scale.
 * @param colorScale - The color scale object.
 * @returns An array of hex values for the shades in the color scale.
 */
export function getColorShadesHexValues(colorScale: ColorScale): string[] {
  const hexValues = colorScale.shades.map(shade => shade.hexValue);
  return hexValues;
}
