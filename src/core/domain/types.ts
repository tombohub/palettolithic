declare const __brand: unique symbol;

/**
 * Hex color code
 */
export type Hex = string & { [__brand]: "Hex" };

/**
 * Color hue value
 */
export type Hue = number & { [__brand]: "Hue" };

/**
 * Color name (red, blue....)
 */
export type ColorName = string & { [__brand]: "ColorName" };

/**
 * Color name and corresponding hue
 */
export type ColoredHue = {
  /**
   * color name (blue, red)
   */
  colorName: ColorName;

  /**
   * hue value of the color
   */
  hue: Hue;
};

/**
 * Hue range with starting hue and ending hue, clockwise
 */
export type HueRange = {
  /**
   * starting hue
   */
  startHue: Hue;

  /**
   * ending hue
   */
  endHue: Hue;
};

/**
 * Hue range with color name for that hue range
 */
export type ColoredHueRange = { colorName: ColorName } & HueRange;
