import { Hex } from "./types";

export type ChromaticColorName =
  | "red"
  | "orange"
  | "yellow"
  | "lime"
  | "green"
  | "teal"
  | "cyan"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "pink";

type NeutralColorName = "gray";

export type ColorName = ChromaticColorName | NeutralColorName;

//TODO: this goes to the frameworks layer
export const shadeWeights = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const;

export type ShadeWeight = (typeof shadeWeights)[number];

//TODO: this is coupled to the color theory and frameworks
export interface ShadeLightness {
  shade: ShadeWeight;
  lighntess: number;
}

/**
 * hex color code
 */
export type HexColorCode = string;

//TODO: coupled color theory <> framework
/**
 * Represents hex value for the corresponding shade weight
 */
export interface ColorShade {
  /**
   * hex string color value
   */
  hexValue: HexColorCode;

  /**
   * shade weight number -> 100, 200...
   */
  weight: ShadeWeight;
}

/**
 * Represents a color scale.
 *
 * @interface
 * @property {ColorName | "gray"} colorName - The name of the color.
 * @property {ColorShade[]} shades - An array of ColorShade objects, each representing a different shade of the color.
 */
export interface ColorScale {
  /**
   * The name of the color.
   */
  colorName: ColorName;

  /**
   * An array of ColorShade objects, each representing a different shade of the color.
   */
  shades: ColorShade[];
}

/**
 * Represents hue range for specific color
 */
export interface ColorHueRange {
  /**
   * color name as in red, yellow...
   */
  colorName: ChromaticColorName;

  /**
   * starting hue value of the color
   */
  start: number;

  /**
   * ending hue value of the color
   */
  end: number;
}

export const colorHueRanges: ColorHueRange[] = [
  // 360 is same as 0
  { colorName: "red", start: 360, end: 360 },
  { colorName: "red", start: 0, end: 29 },
  { colorName: "orange", start: 30, end: 59 },
  { colorName: "yellow", start: 60, end: 89 },
  { colorName: "lime", start: 90, end: 119 },
  { colorName: "green", start: 120, end: 149 },
  { colorName: "teal", start: 150, end: 179 },
  { colorName: "cyan", start: 180, end: 209 },
  { colorName: "blue", start: 210, end: 239 },
  { colorName: "indigo", start: 240, end: 269 },
  { colorName: "violet", start: 270, end: 299 },
  { colorName: "purple", start: 300, end: 329 },
  { colorName: "pink", start: 330, end: 359 },
];

/**
 * List of supported frameworks
 */
export const frameworks = [
  "tailwind",
  "bootstrap 4",
  "css",
  "mantine",
] as const;

/**
 * Represents supported framework
 */
export type Framework = (typeof frameworks)[number];

// export interface Color {
//   name: string;
//   hex: string;
//   hue: number;
//   saturation: number;
//   luminosity: number;
// }

export interface ColorScale2 {
  colorName: string;
  shades: Hex[];
}

export interface ColorPalette {
  colorScales: ColorScale2[];
}
