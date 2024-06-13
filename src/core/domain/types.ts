import { frameworksList } from "./constants";

/**
 * Individual shade in color palette associated with color name
 */
export type PaletteShade = {
  /**
   * hex code of the specific shade
   */
  hexCode: string;

  /**
   * shade weight as numbered in original palette.
   * Lower number means lighter shade
   */
  weight: number;
};

export type ColorScale = {
  /**
   * name of the color
   */
  colorName: string;

  /**
   * list of hex color codes which represent shades for the
   * corresponding color
   */
  shades: PaletteShade[];
};

/**
 * Represents supported framework
 */
export type Framework = (typeof frameworksList)[number];

/**
 * HSL attributes of color
 */
export type HSL = {
  hue: number;
  saturation: number;
  luminosity: number;
};

/**
 * Represents boundaries for the range of value
 *
 */
export type Range = {
  /**
   * lower boundary
   */
  min: number;

  /**
   * upper boundary
   */
  max: number;
};

/**
 * Modification factor for the color
 */
export type ModFactor = {
  /**
   * mod factor for hue
   */
  hueMod: number;

  /**
   * mod factor for saturation
   */
  satMod: number;
};
