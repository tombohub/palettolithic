`
Domain logic and rules used in creating color palette
`;

import { hslFromHex, hexFromHsl } from "./palette";
import { saturationRange } from "./constants";
import { ModFactor, Range } from "./types";
import { calculateClockwiseMidpoint } from "./math";

/**
 * Modify the color attribute value (hue, saturation)
 *
 * Current formula is based on original attribute value, possible attribute value range
 * and modification factor chosen by user. Saturation attribute can be between 0 and 1.
 * Hue attribute range depends on framework original color palette and it's color name
 *
 * @param originalAttributeValue
 * @param minAttributeValue minimum possible value for this attribute
 * @param maxAttributeValue maximum possible value for this attribute
 * @param modFactor modification factor
 * @returns new attribute value
 */
function modifyColorAttribute(
  originalAttributeValue: number,
  minAttributeValue: number,
  maxAttributeValue: number,
  modFactor: number
): number {
  let newValue: number;

  if (modFactor === 0) {
    newValue = originalAttributeValue;
  } else if (modFactor < 0) {
    newValue =
      originalAttributeValue -
      (originalAttributeValue - minAttributeValue) * Math.abs(modFactor);
  } else if (modFactor > 0) {
    newValue =
      originalAttributeValue +
      (maxAttributeValue - originalAttributeValue) * modFactor;
  } else {
    throw new Error(`invalid modification factor ${modFactor}`);
  }

  return newValue;
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
  const newHue = modifyColorAttribute(
    hsl.hue,
    minHue,
    maxHue,
    modFactor.hueMod
  );

  const newSaturation = modifyColorAttribute(
    hsl.saturation,
    saturationRange.min,
    saturationRange.max,
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
