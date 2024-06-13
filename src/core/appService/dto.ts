import { type Framework } from "../domain/types";
import { type ColorScale } from "../domain/types";

/**
 * Input for create palette service
 */
type CreatePalleteInputDto = {
  /**
   * Measure to use for saturaturation modification
   */
  saturationMod: number;

  /**
   * Measure to use for hue modification
   */
  hueMod: number;

  /**
   * framework user selects
   */
  framework: Framework;
};

/**
 * Output of create palette service
 */
type CreatePaletteOutputDto = {
  /**
   * code generated for selected framework
   */
  code: string;

  /**
   * palette data generated for selected framework
   */
  palette: ColorScale[];
};

/**
 * Initial data for the UI
 */
type InitialStateDto = {
  /**
   * list of supported frameworks
   */
  frameworksList: string[];

  /**
   * initial saturation mod
   */
  saturationMod: number;

  /**
   * initial hue mod
   */
  hueMod: number;

  /**
   * initial framework's configuration code
   */
  code: string;

  /**
   * initial framework's palette data
   */
  paletteData: ColorScale[];

  /**
   * framework owner of the configuration code and pallete data
   */
  framework: Framework;
};

export {
  type CreatePalleteInputDto,
  type CreatePaletteOutputDto,
  type InitialStateDto,
};
