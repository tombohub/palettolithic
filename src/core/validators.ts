/**
 * Validates hex color code against 3 or 6 characters. No alpha.
 * @param hexCode hex color code
 * @returns true if hex code is valid
 */
export function validateHexColorValue(hexCode: string): boolean {
  const hexPattern = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i;
  return hexPattern.test(hexCode);
}
