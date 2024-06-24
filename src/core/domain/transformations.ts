`
Palette transformation, with transitioning types.
`;
import { type ColorScale, type ModFactor } from "./types";
import { hslFromHex } from "./palette";
import { findHueRange, modifyHex } from "./logic";

/**
 * Flattens an array of ColorScale objects, the palette
 *
 * @param {ColorScale[]} palette - The array of ColorScale objects to flatten.
 * @returns {FlattenedColorScale[]} The flattened array of FlattenedColorScale objects.
 */
export function flatten(palette: ColorScale[]): FlattenedColorScale[] {
  return palette.flatMap(color =>
    color.shades.map(shade => ({
      colorName: color.colorName,
      order: color.order,
      hexCode: shade.hexCode,
      weight: shade.weight,
    }))
  );
}

/**
 * Extracts the distinct weights from an array of flattened palette.
 *
 * @param data - An array of FlattenedColorScale objects.
 * @returns An array of distinct weights.
 */
export function getDistinctWeights(data: FlattenedColorScale[]): number[] {
  const weights = new Set(data.map(item => item.weight));
  return Array.from(weights);
}

/**
 * Add hue attribue to the flattened color scale which comes from hex code
 * @param data flattened color scale
 * @returns flattened color scale with added hue
 */
export function addHue(data: FlattenedColorScale[]): WithHue[] {
  const addedHues = data.map(x => {
    const hue = hslFromHex(x.hexCode).hue;
    return { ...x, hue };
  });

  return addedHues;
}

/**
 * Filter flattened pallete by weight
 * @param data flattened color palette
 * @param weight
 * @returns colors with chosen weight
 */
export function filterByWeight(
  data: FlattenedColorScale[],
  weight: number
): FlattenedColorScale[] {
  const filtered = data.filter(x => x.weight === weight);
  return filtered;
}

/**
 * Validates that all elements in the input array have the same weight.
 *
 * @param data - An array of WithHue objects.
 * @throws {Error} Throws an error if all elements do not have the same weight.
 */
export function validateAllWeightsAreEqual(data: WithHue[]): void {
  const weights = new Set(data.map(x => x.weight));
  if (weights.size > 1) {
    throw new Error("weights are not equal");
  }
}

/**
 * Sorts an array of objects with a 'hue' attribute in ascending order.
 * Throws an error if the weights of the objects are not equal.
 *
 * @param data - An array of objects with a 'hue' and 'weight' attribute.
 * @returns The input array sorted by hue in ascending order.
 * @throws {Error} When the weights of the objects in the input array are not equal.
 */
export function sortByHue(data: WithHue[]): WithHue[] {
  validateAllWeightsAreEqual(data);
  const sorted = data.sort((a, b) => a.hue - b.hue);
  return sorted;
}

/**
 * Validates that the input array is sorted by hue in ascending order.
 * Throws an error if the array is not sorted in this way.
 *
 * @param data - An array of WithHue objects.
 * @throws {Error} Will throw an error if the array is not sorted by hue in ascending order.
 */
export function validateIsSortedByHue(data: WithHue[]): void {
  data.forEach((item, i) => {
    if (i > 0 && item.hue < data[i - 1].hue) {
      throw new Error("array is not sorted by hue ascending");
    }
  });
}

/**
 * This function adds adjacent hues to each item in the flattened palette array. The adjacent hues are the hues of the previous and next items in the array.
 * It follows the circular nature of hue circle.
 * Array needs to be sorted by hue ascending
 *
 * @param {WithHue[]} data - The array of items with hue.
 * @returns {WithAdjancentHues[]} The array of items with adjacent hues.
 */
export function addAdjancentHues(data: WithHue[]): WithAdjancentHues[] {
  validateIsSortedByHue(data);
  return data.map((item, index, array) => {
    const prevIndex = index === 0 ? array.length - 1 : index - 1;
    const nextIndex = index === array.length - 1 ? 0 : index + 1;

    return {
      ...item,
      prevHue: array[prevIndex].hue,
      nextHue: array[nextIndex].hue,
    };
  });
}

/**
 * Adds hue ranges to the flattened palette with adjancent hues
 *
 * @param data flattened palette
 * @returns flattened palette with added hue ranges
 */
export function addHueRanges(data: WithAdjancentHues[]): WithHueRange[] {
  return data.map(x => {
    const hueRange = findHueRange(x.hue, x.prevHue, x.nextHue);
    return { ...x, minHue: hueRange.min, maxHue: hueRange.max };
  });
}

/**
 * Adds new, modified hex code to the flattened palette with hue ranges
 *
 * @param data - flattened palette
 * @param hueMod - A number representing the hue modification factor
 * @param saturationMod - A number representing the saturation modification factor
 * @returns flattened palette with added modified hex code
 */
export function addModifiedHex(
  data: WithHueRange[],
  modFactor: ModFactor
): WithModifiedHex[] {
  return data.map(x => {
    const modifiedHex = modifyHex(x.hexCode, x.minHue, x.maxHue, modFactor);
    return { ...x, modifiedHex };
  });
}

export function transformToColorScale(data: WithModifiedHex[]): ColorScale[] {
  const resultMap: {
    [key: string]: { weight: number; hexCode: string; order: number }[];
  } = {};

  data.forEach(item => {
    if (!resultMap[item.colorName]) {
      resultMap[item.colorName] = [];
    }
    resultMap[item.colorName].push({
      weight: item.weight,
      hexCode: item.modifiedHex,
      order: item.order,
    });
  });

  return Object.keys(resultMap).map(colorName => {
    const shades = resultMap[colorName].sort((a, b) => a.weight - b.weight);
    const order = resultMap[colorName][0].order; // Assume order is the same for all shades of the same color

    return {
      _tag: "ChromaticColorScale",
      colorName,
      order,
      shades: shades.map(shade => ({
        weight: shade.weight,
        hexCode: shade.hexCode,
      })),
    };
  });
}

export type FlattenedColorScale = {
  colorName: string;
  order: number;
  weight: number;
  hexCode: string;
};

/**
 * Represents flattened color palette with added hue which is extracted from hex
 */
export type WithHue = FlattenedColorScale & { hue: number };

/**
 * Represents flattened palette with added target hue which is extracted from hex
 * and added hues wich are adjancent to the target hue as appear in
 * hue circle for the same weight
 */
export type WithAdjancentHues = WithHue & { prevHue: number; nextHue: number };

/**
 * Flattened palette with added hue ranges for modified hue. Hue range is between min and max hue.
 */
export type WithHueRange = WithAdjancentHues & {
  minHue: number;
  maxHue: number;
};

/**
 * Containes modified hex
 */
export type WithModifiedHex = WithHueRange & { modifiedHex: string };
