`
Domain logic and rules used in creating color palette
`;

import { hslFromHex, hexFromHsl } from "./palette";
import { ModFactor, Range } from "./types";
import { calculateClockwiseMidpoint, _subtractHues, _addHues } from "./math";

/**
 * Modify the color saturation attribute value
 *
 * Current formula is based on original attribute value, possible attribute value range
 * and modification factor chosen by user.
 * Saturation attribute is presumed to be between 0 and 1.
 *
 * @param originalSaturationValue
 * @param satModFactor modification factor
 * @returns new attribute value
 */
export function _modifySaturationAttribute(
  originalSaturationValue: number,
  satModFactor: number
): number {
  let newSaturation: number;

  if (originalSaturationValue < 0 || originalSaturationValue > 1) {
    throw new Error(
      `original saturation value ${originalSaturationValue} is not between 0 and 1`
    );
  }

  if (satModFactor === 0) {
    newSaturation = originalSaturationValue;
  } else if (satModFactor < 0) {
    newSaturation =
      originalSaturationValue -
      (originalSaturationValue - 0) * Math.abs(satModFactor);
  } else if (satModFactor > 0) {
    newSaturation =
      originalSaturationValue + (1 - originalSaturationValue) * satModFactor;
  } else {
    throw new Error(`invalid modification factor ${satModFactor}`);
  }

  return newSaturation;
}

/**
 * Modifies the hue attribute of a color.
 *
 * New hue has to be in specific range which is dependant
 * on colors and their hues in original framework palette
 *
 * @param {number} originalHue - The original hue value.
 * @param {number} minHue - The minimum hue value.
 * @param {number} maxHue - The maximum hue value.
 * @param {number} hueModFactor - The modification factor. If it's 0, the original hue is returned. If it's negative, the hue is decreased. If it's positive, the hue is increased.
 * @returns {number} The new hue value.
 */
export function _modifyHueAttribute(
  originalHue: number,
  minHue: number,
  maxHue: number,
  hueModFactor: number
): number {
  let newHue: number;

  if (hueModFactor < 0) {
    const delta = _subtractHues(originalHue, minHue) * Math.abs(hueModFactor);
    newHue = _subtractHues(originalHue, delta);
  } else if (hueModFactor > 0) {
    const delta = _subtractHues(maxHue, originalHue) * hueModFactor;
    newHue = _addHues(originalHue, delta);
  } else newHue = originalHue;

  return newHue;
}

/**
 * Modify hex color code by applying modification factor, respecting the limitations
 * for the hue and saturation value ranges
 *
 * Saturation value range is fixed, while hue range depends on the original framework palette.
 *
 * @param hexCode original hex code
 * @param minHue minimal possible hue for new hex
 * @param maxHue maximum possible hue for new hex
 * @param modFactor modification factor selected by user
 * @returns new hex code
 */
export function modifyHex(
  hexCode: string,
  minHue: number,
  maxHue: number,
  modFactor: ModFactor
): string {
  const hsl = hslFromHex(hexCode);

  // modify hue and sat
  const newHue = _modifyHueAttribute(hsl.hue, minHue, maxHue, modFactor.hueMod);

  const newSaturation = _modifySaturationAttribute(
    hsl.saturation,
    modFactor.satMod
  );

  const newHex = hexFromHsl({
    hue: newHue,
    saturation: newSaturation,
    luminosity: hsl.luminosity,
  });

  return newHex;
}

/**
 * Find hue range, min and max, for the selected hue of the color palette.
 * @param centralHue
 * @param previousHue hue that comes right before central hue in hue circle, moving clockwise
 * @param nextHue hue that comes right after central hue in hue circle, moving clockwise
 * @returns possible hue range for the central hue
 */
export function findHueRange(
  centralHue: number,
  previousHue: number,
  nextHue: number
): Range {
  const min = calculateClockwiseMidpoint(previousHue, centralHue);
  const max = calculateClockwiseMidpoint(centralHue, nextHue);
  return { min, max };
}
