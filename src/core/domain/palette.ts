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
    hue: hue,
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
