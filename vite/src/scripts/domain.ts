export type ColorName =
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

export const shadeWeights = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
] as const;

export type ShadeWeight = (typeof shadeWeights)[number];

export interface ShadeLightness {
  shade: ShadeWeight;
  lighntess: number;
}

/**
 * Represents hex value for the corresponding shade weight
 */
export interface ColorShade {
  /**
   * hex string color value
   */
  hexValue: string;

  /**
   * shade weight number -> 100, 200...
   */
  weight: ShadeWeight;
}

/**
 * Represents a color palette.
 *
 * @interface
 * @property {ColorName | "gray"} colorName - The name of the color.
 * @property {ColorShade[]} shades - An array of ColorShade objects, each representing a different shade of the color.
 */
export interface ColorPalette {
  /**
   * The name of the color.
   */
  colorName: ColorName | "gray";

  /**
   * An array of ColorShade objects, each representing a different shade of the color.
   */
  shades: ColorShade[];
}

/**
 * Represents hue range for specific color
 */
interface ColorHueRange {
  /**
   * color name as in red, yellow...
   */
  colorName: ColorName;

  /**
   * minimum hue value of the color
   */
  min: number;

  /**
   * maximum hue value of the color
   */
  max: number;
}

export const colorHueRanges: ColorHueRange[] = [
  { colorName: "red", min: 0, max: 30 },
  { colorName: "orange", min: 30, max: 60 },
  { colorName: "yellow", min: 60, max: 90 },
  { colorName: "lime", min: 90, max: 120 },
  { colorName: "green", min: 120, max: 150 },
  { colorName: "teal", min: 150, max: 180 },
  { colorName: "cyan", min: 180, max: 210 },
  { colorName: "blue", min: 210, max: 240 },
  { colorName: "indigo", min: 240, max: 270 },
  { colorName: "violet", min: 270, max: 300 },
  { colorName: "purple", min: 300, max: 330 },
  { colorName: "pink", min: 330, max: 360 },
  { colorName: "red", min: 360, max: 360 },
];
