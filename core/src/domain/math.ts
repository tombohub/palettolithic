/**
 * Subtracts two hues within a 360-degree circle and returns the result within the range of 0 to 359 hue.
 *
 * @param {number} minuend - The hue from which the subtrahend is to be subtracted.
 * @param {number} subtrahend - The hue to be subtracted from the minuend.
 * @returns {number} The result of the subtraction, adjusted to be within the range of 0 to 359 degrees.
 *
 */
export function _subtractHues(minuend: number, subtrahend: number): number {
  return (minuend - subtrahend + 360) % 360;
}

/**
 * Adds two hues and returns the result within the range of 0 to 359 degrees.
 *
 * @param {number} augend - The first angle (in degrees).
 * @param {number} addend - The second angle (in degrees).
 * @returns {number} The sum of the two hues, adjusted to be within the range of 0 to 359 degrees.
 */
export function _addHues(augend: number, addend: number): number {
  const result = (augend + addend) % 360;
  return result;
}

/**
 * Calculates the midpoint between two hues, moving clockwise.
 *
 * @param {number} firstHue
 * @param {number} secondHue
 * @returns {number} The midpoint hue.
 */
export function calculateClockwiseMidpoint(
  firstHue: number,
  secondHue: number
): number {
  const result = _addHues(firstHue, _subtractHues(secondHue, firstHue) / 2);
  return result;
}

/**
 * Creates array of midpoints between consecutive hues in a circular manner., clockwise direction.
 *
 * @param {number[]} hues - An array of hues.
 * @returns {number[]} An array of midpoints between the given hues.
 */
export function _createHuesMidpoints(hues: number[]): number[] {
  if (hues.length === 0) return [];

  hues.sort((a, b) => a - b);
  const lastAngle = hues[hues.length - 1];
  hues.unshift(lastAngle); // make it circular

  const midpoints = [];
  for (let i = 0; i < hues.length - 1; i++) {
    const midpoint = calculateClockwiseMidpoint(hues[i], hues[i + 1]);
    midpoints.push(midpoint);
  }

  return midpoints;
}

/**
 * Creates hue ranges from a set of midpoints.
 *
 * This function takes an array of midpoints, sorts them in ascending order,
 * and then creates ranges between each consecutive pair of midpoints.
 * It handles the circular nature of hues by wrapping around from the last
 * midpoint back to the first midpoint.
 *
 * @param {number[]} midpoints - An array of midpoints.
 * @returns {number[][]} An array of hue ranges, where each range is represented as
 * a pair of start and end hue.
 */
export function _createHueRangesFromMidpoints(midpoints: number[]): number[][] {
  const firstMidpoint = midpoints[0];
  midpoints.push(firstMidpoint); // make it circular

  const ranges = [];
  for (let i = 0; i < midpoints.length - 1; i++) {
    ranges.push([midpoints[i], midpoints[i + 1]]);
  }
  return ranges;
}

/**
 * Creates equally divided hue ranges centered around given hues. Sorted by initial hues. First pair is pair of the lowest hue, last pair is pair of the highest hue
 *
 * This function takes an array of hues and calculates midpoints between consecutive angles,
 * then uses these midpoints to create hue ranges that partition the circular angle space.
 * The ranges are represented as pairs of start and end hues, effectively dividing the circle
 * into segments centered around the input hues.
 *
 * @param {number[]} hues - An array of hues.
 * @returns {number[][]} An array of ranges, where each range is represented as a pair of start and end hues.
 */
export function createHueRanges(hues: number[]): number[][] {
  const midpoints = _createHuesMidpoints(hues);
  const ranges = _createHueRangesFromMidpoints(midpoints);
  return ranges;
}
