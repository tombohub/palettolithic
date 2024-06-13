import { type ColorScale } from "../appService";

/**
 * Internal interface for every framework to implement
 */
type IFramework = {
  /**
   * Get original framework palette
   *
   * It's used so the created palette is close as possible to the original framework
   * so the users don't stride to much from what they expect out of each framework
   * @returns framework palette
   */
  getOriginalPalette: () => ColorScale[];

  /**
   * Generates configuration code based
   * @returns configuration code
   */
  generateCode: () => string;
};

export { type IFramework, type ColorScale };
