import { validateHexColorValue } from "../validators";
import { makeHue } from "./hue";
import { hueFromHex } from "../palette";
import { Hex, Hue } from "./types";

/**
 * Creates a `Hex` type from a given string after validating it as a hex color value.
 *
 * This function ensures that only valid hex color strings can be used as `Hex` types
 * by performing validation. If the input string is not a valid hex color value,
 * the function throws an error.
 *
 * @param {string} hex - The string to be validated and converted to `Hex`.
 * @returns {Hex} - The validated hex string as a `Hex` type.
 * @throws {Error} - If the provided string is not a valid hex color value.
 */
export const makeHex = (hex: string): Hex => {
  if (!validateHexColorValue(hex)) {
    throw new Error(`Invalid hex code: ${hex}`);
  }
  return hex as Hex;
};

export const getHue = (hex: Hex): Hue => {
  const hue = hueFromHex(hex);
  return makeHue(hue);
};
