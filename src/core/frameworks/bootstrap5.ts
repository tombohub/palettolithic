import { HexColorCode } from "../domain";

/**
 * Represents Bootstrap 5 sass variables to customize colors.
 *
 * In _variables.scss boostrap source code it looks like this:
 *
 * ```scss
 * $blue:    #0d6efd !default;
 * $indigo:  #6610f2 !default;
 * $purple:  #6f42c1 !default;
 * ...
 * ```
 *
 * All other shades are derived from these main colors.
 * Gray color has it's own shade map.
 */
interface SassColorVariables {
  blue: HexColorCode;
  indigo: HexColorCode;
  purple: HexColorCode;
  pink: HexColorCode;
  red: HexColorCode;
  orange: HexColorCode;
  yellow: HexColorCode;
  green: HexColorCode;
  teal: HexColorCode;
  cyan: HexColorCode;
}
