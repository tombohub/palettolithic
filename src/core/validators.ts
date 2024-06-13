/**
 * Validates hex color code against 3 or 6 characters. No alpha.
 * @param hexCode hex color code
 * @returns true if hex code is valid
 */
export function validateHexColorValue(hexCode: string): boolean {
  const hexPattern = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;
  return hexPattern.test(hexCode);
}

/**
 * Validates the luminosity value.
 * @param luminosity - The luminosity value to validate.
 * @returns True if the luminosity value is between 0 and 1 (inclusive), false otherwise.
 */
export function validateLuminosity(luminosity: number) {
  return luminosity >= 0 && luminosity <= 1;
}

/**
 * Validates the saturation value.
 * @param saturation - The saturation value to validate.
 * @returns True if the saturation value is between 0 and 1 (inclusive), false otherwise.
 */
export function validateSaturation(saturation: number) {
  return saturation >= 0 && saturation <= 1;
}

/**
 * Validates whether a given hue is within the valid range for HSL/HSV color models.
 *
 * @param {number} hue - The hue value to validate.
 * @returns {boolean} - Returns `true` if the hue is within the range [0, 360], otherwise `false`.
 */
export function validateHue(hue: number) {
  return hue >= 0 && hue <= 360;
}
