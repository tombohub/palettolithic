import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { type Framework } from "@/core/domain/domain";
import {
  type InputDto,
  generatePalette,
  initializeState,
  type ColorScale,
} from "@/core/appService";

interface SliceState {
  /**
   * hex value picked by user
   */
  pickedHexValue: string;

  /**
   * True if hex code is valid according to the domain rules
   */
  isValidHex: boolean;

  /**
   * current color palette generated from picked hex value
   */
  currentPalette: ColorScale[];

  /**
   * available frameworks choices
   */
  frameworks: string[];

  /**
   * currently selected framework by user
   */
  activeFramework: string;

  /**
   * generated configuration code for the framework
   */
  configurationCode: string;

  /**
   * language of the generated code
   */
  codeLanguage: "javascript" | "css" | "scss";
}

const initialState: SliceState = {
  pickedHexValue: initializeState().hexCode,
  isValidHex: true,
  currentPalette: initializeState().paletteData,
  frameworks: initializeState().frameworksList,
  activeFramework: initializeState().framework,
  configurationCode: initializeState().code,
  codeLanguage: "javascript",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setHexValue: (state, action: PayloadAction<string>) => {
      state.pickedHexValue = action.payload;
      state.configurationCode = newConfigurationCode(state);
    },
    setActiveFramework: (state, action: PayloadAction<Framework>) => {
      state.activeFramework = action.payload;
      state.configurationCode = newConfigurationCode(state);
    },
  },
});

/**
 * Call to generate framework configuration code based on current slice state.
 * @param state current slice state
 * @returns framework configuration code based on current state
 */
function newConfigurationCode(state: SliceState) {
  const inputDto: InputDto = {
    hexCode: state.pickedHexValue,
    framework: state.activeFramework,
  };
  const code = generatePalette(inputDto).code;
  return code;
}

export const appActions = appSlice.actions;
export default appSlice.reducer;
