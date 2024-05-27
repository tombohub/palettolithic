import { validateHue } from "../validators";
import { ColoredHue, Hue, HueRange, ColoredHueRange } from "./types";
import * as utils from "../utils";
import { ColorHueRange } from "./domain";

/**
 * The `makeHue` function creates a `Hue` type from a number.
 *
 * @param hue A number representing a hue.
 * @returns A `Hue` type representing the hue.
 * @throws {Error} Will throw an error if the hue value is not valid.
 */
export const makeHue = (hue: number): Hue => {
  if (!validateHue(hue)) {
    throw new Error(`Invalid hue value: ${hue}`);
  }
  return hue as Hue;
};

function _createHueRanges(hues: Hue[]): HueRange[] {
  const rangesPrimitive = utils.createHueRanges(hues);
  const rangesTyped: HueRange[] = rangesPrimitive.map(range => {
    const rangeTyped: HueRange = {
      startHue: makeHue(range[0]),
      endHue: makeHue(range[1]),
    };
    return rangeTyped;
  });

  return rangesTyped;
}

function findColorNameInRanges(
  coloredRanges: ColoredHueRange[],
  hue: Hue
): string {
  const colorName = coloredRanges.find(
    x => x.startHue <= hue && hue < x.endHue
  )?.colorName;
  if (colorName) return colorName;
  else throw new Error();
}

function createColoredHueRanges(coloredHues: ColoredHue[]): ColoredHueRange[] {
  const hues = coloredHues.map(x => x.hue);
  const ranges: HueRange[] = _createHueRanges(hues);
  ranges.map(range => {});
}
