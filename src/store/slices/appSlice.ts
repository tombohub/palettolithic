import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { createPalette } from "@/core/palette";
import { frameworks, type Framework } from "@/core/domain";

import { generateCode } from "@/core/code";
import { validateHexColorValue } from "@/core/validators";
import { genCode } from "@/core/main";

import { ColorScale } from "@/core/domain";
import {
  INITIAL_HEX_VALUE,
  INITAL_PALETTE,
  INITIAL_FRAMEWORK,
  INITIAL_CONFIGURATION_CODE,
  INITIAL_CODE_LANGUAGE,
} from "./initializeStates";

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
  frameworks: typeof frameworks;

  /**
   * currently selected framework by user
   */
  activeFramework: Framework;

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
  pickedHexValue: INITIAL_HEX_VALUE,
  isValidHex: true,
  currentPalette: INITAL_PALETTE,
  frameworks: frameworks,
  activeFramework: INITIAL_FRAMEWORK,
  configurationCode: INITIAL_CONFIGURATION_CODE,
  codeLanguage: INITIAL_CODE_LANGUAGE,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setHexValue: (state, action: PayloadAction<string>) => {
      state.pickedHexValue = action.payload;
      state.configurationCode = newCofigurationCode(state);
    },
    setActiveFramework: (state, action: PayloadAction<Framework>) => {
      state.activeFramework = action.payload;
      state.configurationCode = newCofigurationCode(state);
    },
  },
});

function newCofigurationCode(state: SliceState) {
  return genCode(state.pickedHexValue, state.activeFramework);
}

export const appActions = appSlice.actions;
export default appSlice.reducer;
