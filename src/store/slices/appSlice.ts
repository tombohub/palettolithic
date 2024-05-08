import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { createPalette } from "@/core/palette";
import { frameworks, type Framework } from "@/core/domain";

import { generateTailwind } from "@/scripts/generateTailwind";
import { generateBootstrap } from "@/scripts/generateBootstrap";
import { generateCssVariables } from "@/scripts/generateCssVariables";

import { ColorScale } from "@/core/domain";
import {
  INITIAL_HEX_VALUE,
  INITAL_PALETTE,
  INITIAL_FRAMEWORK,
  INITIAL_CONFIGURATION_CODE,
  INITIAL_CODE_LANGUAGE,
} from "./initializeStates";

interface InitialState {
  /**
   * hex value picked by user
   */
  pickedHexValue: string;

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

const initialState: InitialState = {
  pickedHexValue: INITIAL_HEX_VALUE,
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
      state.currentPalette = createPalette(action.payload);
      switch (state.activeFramework) {
        case "tailwind":
          state.configurationCode = generateTailwind(state.currentPalette);
          state.codeLanguage = "javascript";
          break;
        case "bootstrap 4":
          state.configurationCode = generateBootstrap(state.currentPalette);
          state.codeLanguage = "scss";
          break;
        case "css":
          state.configurationCode = generateCssVariables(state.currentPalette);
          state.codeLanguage = "css";
          break;
      }
    },
    setActiveFramework: (state, action: PayloadAction<Framework>) => {
      state.activeFramework = action.payload;
      switch (action.payload) {
        case "tailwind":
          state.configurationCode = generateTailwind(state.currentPalette);
          state.codeLanguage = "javascript";
          break;
        case "bootstrap 4":
          state.configurationCode = generateBootstrap(state.currentPalette);
          state.codeLanguage = "scss";
          break;
        case "css":
          state.configurationCode = generateCssVariables(state.currentPalette);
          state.codeLanguage = "css";
          break;
      }
    },
  },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
