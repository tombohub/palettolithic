export type InputDto = {
  /**
   * hex code user selects
   */
  hexCode: string;

  /**
   * framework user selects
   */
  framework: string;
};

type OutputDto = {
  /**
   * code generated for selected framework
   */
  code: string;

  /**
   * palette data generated for selected framework
   */
  data: ColorScale[];
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
  shades: string[];
};

/**
 * Generate palette from user inputs
 * @param input user selected inputs
 * @returns generated palette
 */
export function generatePalette(input: InputDto): OutputDto {
  const outputDto: OutputDto = {
    code: "this is the dummy code",
    data: [{ colorName: "red", shades: ["hex1", "hex2"] }],
  };
  return outputDto;
}

/**
 * Initial data for the UI
 */
export type InitialDto = {
  /**
   * list of supported frameworks
   */
  frameworksList: string[];

  /**
   * initial hex code
   */
  hexCode: string;

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
  framework: string;
};

/**
 * Initialize data and state for the first time load
 * @returns Initial data and state for the app
 */
export function initializeState(): InitialDto {
  const initialDto: InitialDto = {
    frameworksList: ["initial framework1", "initial framework2"],
    hexCode: "#07c",
    code: "initial code",
    paletteData: [
      { colorName: "initial color", shades: ["initial hex1", "initial hex2"] },
    ],
    framework: "initial framework",
  };

  return initialDto;
}
