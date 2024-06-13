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
import { type HSL } from "./types";

/**
 * Convert hex code to HSL data
 *
 * @param {string} hexCode - hex code.
 * @returns {number} object containg HSL values
 */
export function hslFromHex(hexCode: string): HSL {
  const [hue, sat, lum] = chroma(hexCode).hsl();
  return {
    hue: Math.round(hue),
    saturation: sat,
    luminosity: lum,
  };
}

/**
 * Converts an HSL color value to a hexadecimal string.
 *
 * @param hsl - An object representing an HSL color. It should have properties for 'hue', 'saturation', and 'luminosity'.
 * @returns A string representing the hexadecimal color value.
 */
export function hexFromHsl(hsl: HSL): string {
  return chroma.hsl(hsl.hue, hsl.saturation, hsl.luminosity).hex();
}

/* ------------------------------ Main Function ----------------------------- */
